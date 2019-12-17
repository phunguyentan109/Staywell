const db = require("../models");
const {genToken} = require("../utils/token");
const mail = require("../utils/mail");

exports.signUp = async(req, res, next) => {
    try {
<<<<<<< HEAD
        let uname = req.body.email.split("@")[0];
        let user = await db.User.create({username: uname, ...req.body});
        let {_id, username, email, active, avatar} = user;
=======
        let username = req.body.email.split("@")[0];
        let user = await db.User.create({username, ...req.body});
        let {_id, email, active, avatar} = user;
>>>>>>> Phu

        // gen token for storing on client
        let token = genToken(_id);

        //send activate mail
        await mail.activate(email, username, _id, req.headers.host);

        return res.status(200).json({_id, username, avatar, email, active, token});
    } catch(err) {
        return next({
            status: 400,
            message: err.code === 11000 ? "Sorry, that email/password is taken or invalid" : err.message
        })
    }
}

exports.logIn = async(req, res, next) => {
    try {
<<<<<<< HEAD
        if(!req.body.email.includes("@")) req.body.email = `${req.body.email}@gmail.com`;
        let user = await db.User.findOne({email: req.body.email});
        let {_id, username, email, active, avatar} = user;
=======
        let {email, password} = req.body;
        email = email.includes("@") ? email :`${email}@gmail.com`;

        let user = await db.User.findOne({email});
        let {_id, username, active, avatar} = user;

>>>>>>> Phu
        // compare password
        let match = await user.comparePassword(password);
        if(match){
            // get role of user
            let userRole = await db.UserRole.find({user_id: _id}).populate("role_id").exec();
            let role = userRole.length > 0 ? userRole.map(u => u.role_id) : false;

            // gen token to store on client
            let token = genToken(_id, role);

            return res.status(200).json({_id, username, avatar, email, role, active, token});
        } else {
            return next({
                status: 400,
                message: "Invalid email/password."
            })
        }
    } catch(err) {
        console.log(err);
        return next({
            status: 400,
            message: "Invalid email/password."
        })
    }
}

exports.getOne = async(req, res, next) => {
    try {
        let user = await db.User.findById(req.params.user_id);
        let {_id, username, email, active, avatar, phone} = user;

        // get role
        let userRole = await db.UserRole.find({user_id: _id}).populate("role_id").exec();
        let role = userRole.length > 0 ? userRole.map(u => u.role_id) : false;

        // return email and phone for updating profile
        return res.status(200).json({_id, username, email, avatar, role, active, phone});
    } catch(err) {
        return next(err);
    }
}

exports.get = async(req, res, next) => {
    try {
        let users = await db.User.find({active: false});
        return res.status(200).json(users);
    } catch(err) {
        return next(err);
    }
}

exports.getAll = async(req, res, next) => {
    try {
        let users = await db.User.find().exec();
        return res.status(200).json(users);
    } catch (err) {
        return next(err);
    }
}

exports.remove = async(req, res, next) => {
    try {
        let user = await db.User.findById(req.params.user_id);
        if(user) user.remove();
        return res.status(200).json(user);
    } catch(err) {
        return next(err);
    }
}

<<<<<<< HEAD
exports.getOne = async(req, res, next) => {
    try {
        let user = await db.User.findById(req.params.user_id);
        let {_id, username, email, active, avatar, phone} = user;

        // get role
        let userRole = await db.UserRole.find({user: _id}).populate("role_id").exec();
        let role = userRole.length > 0 ? userRole.map(u => u.role_id) : false;

        // get people_id
        let people_id = false;
        if(role && role.code !== "000"){
            people_id = (await db.People.findOne({user_id: _id}).populate().exec())._id;
        }

        // return email and phone for updating profile
        return res.status(200).json({_id, username, email, avatar, role, active, phone, people_id});
    } catch(err) {
        return next(err);
    }
}

=======
>>>>>>> Phu
exports.updatePassword = async(req, res, next) => {
    try {
        let user = await db.User.findById(req.params.user_id);

        // verify old password and change password
        let {password, newPassword} = req.body;
        let match = await user.comparePassword(password);
        if(match){
            user.password = newPassword;
            await user.save();
            return res.status(200).json(user);
        } else {
            // return error if old password is not matched
            return next({
                status: 400,
                message: err.code === 11000 ? "Sorry, the password is invalid" : err.message
            })
        }
    } catch(err) {
        return next({
            status: 400,
            message: err.code === 11000 ? "Sorry, the password is invalid" : err.message
        });
    }
}

exports.activate = async(req, res, next) => {
    try {
        let user = await db.User.findById(req.params.user_id);
        if(user) {
            user.active = true;
            await user.save();

            // add role for user
            let role = await db.Role.findOne({code: "001"});
            await db.UserRole.create({role: role._id, user: user._id});
            return res.status(200).json({user, people});
        }
        return next({
            status: 404,
            message: "The account information is not available."
        })
    } catch(err) {
        return next(err);
    }
}

exports.contact = async(req, res, next) => {
    try {
        let {title, content, user_id} = req.body;
        let listUser = [];

        // get user mail from user_id
        for(let id of user_id) {
            let user = await db.User.findById(id);
            let {email, username} = user;
            listUser.push(username);
            mail.contactUser(email, username, content, title);
        }

        return res.status(200).json(listUser);
    } catch(err) {
        return next(err);
    }
}

exports.update = async(req, res, next) => {
    try {
        let updateUser = await db.User.findByIdAndUpdate(req.params.user_id, req.body, {new: true});
        return res.status(200).json(updateUser);
    } catch(err) {
        return next(err);
    }
}

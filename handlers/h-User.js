const db = require("../models");
const {genToken} = require("../utils/token");
const mail = require("../utils/mail");

exports.signUp = async(req, res, next) => {
    try {
        let vname = req.body.email.split("@")[0];
        let user = await db.User.create({viewname: vname, ...req.body});
        let {_id, viewname, email, active, avatar} = user;

        // gen token for storing on client
        let token = genToken(_id);

        //send activate mail
        await mail.activate(email, viewname, _id, req.headers.host);

        return res.status(200).json({_id, viewname, avatar, email, active, token});
    } catch(err) {
        return next({
            status: 400,
            message: err.code === 11000 ? "Sorry, that email/password is taken or invalid" : err.message
        })
    }
}

exports.logIn = async(req, res, next) => {
    try {
        let user = await db.User.findOne({email: req.body.email});
        let {_id, viewname, email, active, avatar} = user;
        // compare password
        let match = await user.comparePassword(req.body.password);
        if(match){

            // get role of user
            let userRole = await db.UserRole.findOne({user: _id}).populate("role_id").exec();
            let role = userRole.role ? userRole.role : false;

            // gen token to store on client
            let token = genToken(_id, role);

            return res.status(200).json({_id, viewname, avatar, email, role, active, token});
        } else {
            return next({
                status: 400,
                message: "Invalid email/password."
            })
        }
    } catch(err) {
        return next({
            status: 400,
            message: "Invalid email/password."
        })
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

exports.getOne = async(req, res, next) => {
    try {
        let user = await db.User.findById(req.params.user_id);
        let {_id, viewname, email, active, avatar, phone} = user;

        // get role
        let userRole = await db.UserRole.findOne({user: _id}).populate("role_id").exec();
        let role = userRole ? userRole.role : false;

        // get people_id
        let people_id = false;
        if(role && role.code !== "000"){
            people_id = (await db.People.findOne({user_id: _id}).populate().exec())._id;
        }

        // return email and phone for updating profile
        return res.status(200).json({_id, viewname, email, avatar, role, active, phone, people_id});
    } catch(err) {
        return next(err);
    }
}

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

            // add role for user
            let role = await db.Role.findOne({code: "001"});
            await db.UserRole.create({role: role._id, user: user._id});
            await user.save();

            // create people
            people = await db.People.create({user_id: user._id});
            return res.status(200).json({user, people});
        }
        return next({
            status: 500,
            message: "Oops! Something went wrong!"
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
            let {email, viewname} = user;
            listUser.push(viewname);
            mail.contactUser(email, viewname, content, title);
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

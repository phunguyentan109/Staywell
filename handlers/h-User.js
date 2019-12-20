const db = require("../models");
const {genToken} = require("../utils/token");
const mail = require("../utils/mail");

exports.signUp = async(req, res, next) => {
    try {
        let username = req.body.email.split("@")[0];
        let user = await db.User.create({username, ...req.body});
        let {_id, email, active, avatar} = user;

        // gen token for storing on client
        let token = genToken(_id);

        // Push the role UNACTIVE for user
        let role = await db.Role.findOne({code: "002"});
        await db.UserRole.create({role_id: role._id, user_id: user._id});

        //send activate mail
        await mail.activate(email, username, _id, req.headers.host);

        return res.status(200).json({_id, username, avatar, email, active, token, role: [role]});
    } catch(err) {
        return next({
            status: 400,
            message: err.code === 11000 ? "Sorry, that email/password is taken or invalid" : err.message
        })
    }
}

exports.logIn = async(req, res, next) => {
    try {
        let {email, password} = req.body;
        email = email.includes("@") ? email :`${email}@gmail.com`;

        let user = await db.User.findOne({email});
        let {_id, username, active, avatar} = user;

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
        let userRole = await db.UserRole.find({user_id: _id}).populate("role_id").lean().exec();
        let role = userRole.length > 0 ? userRole.map(u => u.role_id) : false;

        // return email and phone for updating profile
        return res.status(200).json({_id, username, email, avatar, role, active, phone});
    } catch(err) {
        return next(err);
    }
}

exports.activate = async(req, res, next) => {
    try {
        const {user_id} = req.params;

        // check if the user id is not fake
        let user = await db.User.findById(user_id).lean().exec();
        if(!user) {
            return next({
                status: 404,
                message: "The account information is not available."
            })
        }

        // check if user already has the PEOPLE permission
        let peopleRole = await db.Role.findOne({code: "001"}).lean().exec();
        let foundUserRole = await db.UserRole.findOne({user_id, role_id: peopleRole._id}).lean().exec();

        // if the user still has UNACTIVE, replace with PEOPLE
        let unactiveRole = await db.Role.findOne({code: "002"}).lean().exec();
        if(user && !foundUserRole) {
            let userRole = await db.UserRole.findOne({user_id: user._id, role_id: unactiveRole._id});
            userRole.role_id = peopleRole._id;
            await userRole.save();
        }
        return res.status(200).json({success: true});
    } catch(err) {
        return next(err);
    }
}

exports.get = async(req, res, next) => {
    try {
        let ownerRole = await db.Role.findOne({code: "000"});
        let users = await db.UserRole.find()
        .populate("role_id")
        .populate({
            path: "user_id",
            populate: {
                path: "room_id"
            }
        }).lean().exec();
        return res.status(200).json(users.filter(ur => !ownerRole._id.equals(ur.role_id._id)));
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

exports.updatePassword = async(req, res, next) => {
    try {
        let user = await db.User.findById(req.params.user_id);

        // verify old password and change password
        let {current, change} = req.body;
        let match = await user.comparePassword(current);
        if(match){
            user.password = change;
            await user.save();

            //send activate mail
            await mail.changePassword(user.email, user.username);
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

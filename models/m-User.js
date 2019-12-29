const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const db = require("./index");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        cloudId: String,
        link: {
            type: String,
            default: "https://images.unsplash.com/photo-1563729574084-950da51d3822?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixlib=rb-1.2.1&q=80&w=100"
        }
    },
    phone: String,
    job: String,
    birthDate: {
        type: Date,
        default: Date.now
    },
    resetPwToken: String,
    resetPwExpires: Date,
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    },
    bill_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bill"
        }
    ]
});

userSchema.pre("save", async function(next){
    try {
        //only hash the password if it is modified or new
        if(!this.isModified("password")) return next();

        let hashPassword = await bcrypt.hash(this.password, 10);
        this.password = hashPassword;
        return next();
    } catch(err) {
        return next(err);
    }
})

userSchema.pre("remove", async function(next){
    try {
        await db.UserRole.deleteMany({user_id: this._id});
        return next();
    } catch(err) {
        return next(err);
    }
})

userSchema.methods.comparePassword = async function(candidatePassword, next){
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch(err) {
        return next(err);
    }
}

module.exports = mongoose.model("User", userSchema);

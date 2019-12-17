const db = require("./models");

const roles = [
    {
        type: "FULL CONTROL",
        code: "000",
        desc: ""
    },
    {
        type: "PEOPLE CONTROL",
        code: "001",
        desc: ""
    }
];

const owner = {
    email: process.env.GMAILUSER,
    password: "owner",
    viewname: "owner",
    active: true
}

async function createRole(){
    try {
        let list = await db.Role.find();
        if(list.length === 0){
            for(let role of roles){
                await db.Role.create(role);
            }
            return console.log("[ ROLE CREATED ]");
        }
        return console.log("[ ROLE LOADED ]");
    } catch(err) {
        console.log(err);
    }
}

async function createOwner() {
    try {
        let role = await db.Role.findOne({code: "000"});
        let noOwner = (await db.UserRole.find({role: role._id})).length === 0;
        if(noOwner) {
            let user = await db.User.create(owner);
            await db.UserRole.create({role: role._id, user: user._id});
            return console.log("[ OWNER CREATED ]");
        }
        return console.log("[ OWNER LOADED ]");
    } catch(err) {
        console.log(err);
    }
}

module.exports = async() => {
    await createRole();
    await createOwner();
};

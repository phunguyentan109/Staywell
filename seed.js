require("dotenv").config();
const db = require("./models");

const roles = [
    {
        type: "OWNER CONTROL",
        code: "000",
        desc: ""
    },
    {
        type: "PEOPLE CONTROL",
        code: "001",
        desc: ""
    },
    {
        type: "UNACTIVE CONTROL",
        code: "002",
        desc: ""
    }
];

const owner = {
    email: process.env.GMAILUSER,
    password: "owner",
    username: "owner"
};

async function createRole(){
    try {
        let list = await db.Role.find();
        if(list.length === 0){
            for(let role of roles){
                await db.Role.create(role);
            }
        }
    } catch(err) {
        console.log(err);
    }
}

async function createOwner() {
    try {
        let role = await db.Role.findOne({code: "000"}).lean().exec();
        let noOwner = (await db.UserRole.find({role_id: role._id}).lean().exec()).length === 0;
        if(noOwner) {
            let user = await db.User.create(owner);
            await db.UserRole.create({
                role_id: role._id,
                user_id: user._id
            });
        }
    } catch(err) {
        console.log(err);
    }
}

async function seed() {
    console.log("");
    console.log("----- SEEDING DATA -----");

    console.log("- Importing all role data...");
    await createRole();

    console.log("- Importing owner and owner's role data...");
    await createOwner();

    console.log("=> Process is completed successfully!");
    process.exit();
}

seed();

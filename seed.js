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

const userList = [
    {
        email: "magazine.group1213@gmail.com",
        password: "123",
        username: "magazine.group1213"
    },
    {
        email: "ma.gazine.group1213@gmail.com",
        password: "123",
        username: "m.agazine.group1213@gmail.com"
    },
    {
        email: "maga.zine.group1213@gmail.com",
        password: "123",
        username: "maga.zine.group1213@gmail.com"
    },
    {
        email: "magazi.ne.group1213@gmail.com",
        password: "123",
        username: "magazi.ne.group1213@gmail.com"
    },
    {
        email: "magazine.group1.213@gmail.com",
        password: "123",
        username: "magazine.group1.213@gmail.com"
    }
];

const priceList = [
    {
        type: "Price 1",
        room_id: [],
        electric: 300,
        wifi: 100,
        water: 300,
        house: 3000,
        extra: 100,
        duration: 6
    },
    {
        type: "Price 2",
        room_id: [],
        electric: 450,
        wifi: 120,
        water: 200,
        house: 3500,
        extra: 50,
        duration: 12
    },
    {
        type: "Price 3",
        room_id: [],
        electric: 350,
        wifi: 110,
        water: 150,
        house: 4000,
        extra: 100,
        duration: 8
    },
];

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

async function createUser() {
    try {
        let role = await db.Role.findOne({code: "001"}).lean().exec();
        let noUser = (await db.UserRole.find({role_id: role._id}).lean().exec()).length === 0;
        if(noUser) {
            for(let item of userList) {
                let user = await db.User.create(item);
                await db.UserRole.create({
                    role_id: role._id,
                    user_id: user._id
                });
            }
        }
    } catch(err) {
        console.log(err);
    }
}

async function createPrice() {
    try {
        let noPrice = (await db.Price.find().lean().exec()).length === 0;
        if(noPrice) {
            for(let price of priceList) {
                await db.Price.create(price);
            }
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

    console.log("- Importing user and user's role data...");
    await createUser();

    console.log("- Importing price data...");
    await createPrice();

    console.log("=> Process is completed successfully!");
    process.exit();
}

seed();

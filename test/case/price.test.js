const expect = require("expect.js");
const prc = require("../prc");
const {owner, price, ...sample} = require("../sample");

describe("PRICE HANDLER TESTS", function(){

    before(async function(){
        await sample.clear();
        logUser = await prc.User.logIn(owner);

        authorization = `Bearer ${logUser.token}`;

        createdPrice = "";
    })

    describe("1. Create new price", function(){

        it("Create price with user account", async function(){
            let rs = await prc.Price.create(logUser._id, price, authorization);
            createdPrice = rs;

            expect(rs).to.have.keys("electric", "wifi", "water", "house", "extra", "duration", "_id");
            expect(rs.electric).to.be(price.electric);
            expect(rs.wifi).to.be(price.wifi);
            expect(rs.water).to.be(price.water);
            expect(rs.house).to.be(price.house);
            expect(rs.extra).to.be(price.extra);
            expect(rs.duration).to.be(price.duration);
        })

        it("Should create new price with fake user id account", async function(){
            let rs = await prc.Price.create("123", price, authorization);

            expect(rs).to.have.keys("status", "message");
        });
    })

    describe("2. View all price", function(){
        it("Display all price successfully", async function(){
            let rs = await prc.Price.get(logUser._id);

            expect(rs).to.be.an("array");
        })
    })

    describe("3. Update price", function(){
        it("Update price successfully", async function(){
            let rs = await prc.Price.update(logUser._id, createdPrice._id, price, authorization);

            expect(rs).to.have.keys("electric", "wifi", "water", "house", "extra", "duration");
            expect(rs.electric).to.be(price.electric);
            expect(rs.wifi).to.be(price.wifi);
            expect(rs.water).to.be(price.water);
            expect(rs.house).to.be(price.house);
            expect(rs.extra).to.be(price.extra);
            expect(rs.duration).to.be(price.duration);
            expect(rs._id).to.be(createdPrice._id);
        })

        it("Update price with fake user id account", async function(){
            let rs = await prc.Price.update("123", createdPrice._id, price, authorization);

            expect(rs).to.have.keys("status", "message");
        })
    })

    describe("4. Delete price", function(){
        it("Delete price successfully", async function(){
            let rs = await prc.Price.remove(logUser._id, createdPrice._id, authorization);

            expect(rs._id).to.be(createdPrice._id);
        })

        it("Delete price with fake user id account", async function(){
            let rs = await prc.Price.remove("123", createdPrice._id, authorization);

            expect(rs).to.have.keys("status", "message");
        })
    })

    after(async function(){
        await sample.clear();
    })
})

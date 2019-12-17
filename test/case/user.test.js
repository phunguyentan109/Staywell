const expect = require("expect.js");
const prc = require("../prc");
const {user, ...sample} = require("../sample");

describe("USER HANDLER TESTS", function(){

    before(async function(){
        await sample.clear();
    })

    describe("1. Sign up user account", function(){

        it("Sign up user successfully!", async function(){
            let rs = await prc.User.signUp(user);

            expect(rs).to.have.keys("_id", "viewname", "avatar", "email", "role", "active", "token");
            expect(rs.email).to.be(user.email);
            expect(rs.active).to.be(false);
            expect(rs.avatar).to.have.keys("link");
        })

        it("Sign up user failed with used email", async function(){
            let rs = await prc.User.signUp(user);

            expect(rs).to.have.keys("status", "message");
        })

    })

    describe("2. Sign in user account", function(){

        it("Sign in user successfully", async function(){
            let rs = await prc.User.logIn(user);

            expect(rs).to.have.keys("_id", "viewname", "avatar", "email", "role", "active", "token");
            expect(rs.email).to.be(user.email);
            expect(rs.active).to.be(false);
            expect(rs.avatar).to.have.keys("link");
        })

        it("Sign in user failed with unavailable email", async function(){
            let rs = await prc.User.logIn({...user, email: "a@"});

            expect(rs).to.have.keys("status", "message");
        })

        it("Sign in user failed with wrong password", async function(){
            let rs = await prc.User.logIn({...user, password: "123"});

            expect(rs).to.have.keys("status", "message");
        })

    })

    after(async function(){
        await sample.clear();
    })

})

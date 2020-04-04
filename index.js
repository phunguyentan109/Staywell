require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const hdl = require("./handlers");
const path = require('path');

app.use(express.static(path.join(__dirname, 'cli/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use("/api/user", require("./routes/r-User"));
app.use("/api/price", require("./routes/r-Price"));
app.use("/api/rooms", require("./routes/r-Room"));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/cli/build/index.html'));
});

app.use(hdl.Error.invalidRoute);

// All the error will be turned into JSON in here
app.use(hdl.Error.wrapErr);

app.listen(process.env.PORT, () =>
    console.log(`[ SERVER IS STARTED ON PORT ${process.env.PORT} ]`)
);

const { error } = require("console");
var express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb', extended: true}));
app.use(express.json());
app.use(express.static("assets"));

// mongoose.connect("mongodb://localhost:27017/ecommerce");
mongoose.connect("mongodb+srv://Shree:Shree@123@cluster0.1w4w7.mongodb.net/ecommerce");
const db = mongoose.connection;
db.on("error", error => {
    console.log(error);
});
db.on("open", () => {
    console.log("Connection Established");
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH , DELETE");
        return res.status(200).json({});
    }
    next();
});


app.get("/", function (req, res) {
    res.send("hello welcome to ecommerce website");
    res.end();
});

app.use("/admin", require("./routes/admin"));
app.use("/products", require("./routes/product"));
app.use("/orders", require("./routes/order"));
app.use("/subscriptions", require("./routes/subscription"));




const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("node server started");
});


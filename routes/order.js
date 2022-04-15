var express = require("express");
var bodyparser = require("body-parser");
const req = require("express/lib/request");
const Orders = require("../models/Order");
var jasonparser = bodyparser.json();
const router = express.Router();
var nodemailer = require("nodemailer");

router.post("/place/", async (req, res) => {
    let body = req.body;
    let order = new Orders();

    order.orderdate=body.data.orderdate;
    order.productid=body.data.productid;
    order.size=body.data.size;
    order.color=body.data.color;
    order.name=body.data.name;
    order.email=body.data.email;
    order.mobileno=body.data.mobileno;
    order.address=body.data.address;
    order.pincode=body.data.pincode;
    order.quantity=body.data.quantity;
    order.place=body.data.place;
    order.shipping=body.data.shipping;
    order.total=body.data.total;
    order.status=body.data.status;


    order.save().then(result => {
        res.send(JSON.stringify(result));
    }, err => {
        res.send(JSON.stringify(err));
    });

});



router.post("/list", async (req, res) => {
    let order = await Orders.find();
    res.json({ data: order });
});


router.post("/get", async (req, res) => {
    let body = req.body
    let order = await Orders.findById(body.data.id);
    res.json({ data: order });
});


router.post("/changestatus", async (req, res) => {
    let body = req.body;
    let order = new Orders();

    order = await Orders.findById(body.data.id);

    order.status = body.data.status;

    order.save().then(result => {
        res.send(JSON.stringify(result));
    }, err => {
        res.send(JSON.stringify(err));
    });

});


router.post("/paymentstatus", async (req, res) => {
    let body = req.body;
    let order = Order();
    order = await Order.findById(body.data.id);
    order.status = "paid";
    order.save().then(result => {

        // Sending Email to Admin and User 
        let body = getadminmail(order);
        sendmail("gajananupase8994@gmail.com", "order received", body);
        body = getusermail(order);
        sendmail(order.email, "Hello" + order.name + ", Your Order Received");


        res.end(JSON.stringify(result));
    }, err => {
        res.end(JSON.stringify(err));
    });

    res.json({ data: order });

});

function getadminmail(order) {
    var body = "Hello Admin, Order Received ";
    return body
}

function getusermail(order) {
    var body = "Hello User, Order Received ";
    return body
}


function sendmail(to , subject, body){

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gajananupase8994@gmail.com',
    pass: '89948994'
  }
});

var mailOptions = {
  from: 'gajananupase8994@gmail.com',
  to: to,
  subject: subject,
  text: body
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}

router.post("/delete", async (req, res) => {
    let body = req.body
    await Orders.findByIdAndDelete(body.data.id);
    let data = {
        "data": {
            "status": "success"
        }

    }
    res.end(JSON.stringify(data));
});

module.exports = router;
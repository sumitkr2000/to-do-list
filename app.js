const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const date = require(__dirname + "/date");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-sumit:iamlucky1923@cluster0.njk5asw.mongodb.net/todolistDB");

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

app.get("/", function(req, res) {
    
    const date = new Date();

    const options = {
        weekday: "long",
        month: "long",
        day: "numeric"
    }

    const day = date.toLocaleDateString("en-US", options);

    Item.find({}, function(err, foundItems) {
        res.render("list", {listTitle: day, newListItems: foundItems});
    });
});

app.post("/", function(req, res) {

    const itemName = req.body.newItem;

    const item = new Item ({
        name: itemName
    });

    item.save();
    res.redirect("/");
});

app.post("/delete", function(req, res) {
    const checkedItemID = req.body.checkbox;

    Item.deleteOne({_id: checkedItemID}, function(err) {
        if(!err) {
            res.redirect("/");
        }
    });
});

app.get("/about", function(req, res) {
    res.render("about");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
    console.log("Server has started successfully.")
});
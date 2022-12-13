const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

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

app.listen(port, function() {
    console.log("Server has started successfully.")
});
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-sumit:iamlucky1923@cluster0.njk5asw.mongodb.net/todolistDB");

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

// const listSchema = {
//     name: String,
//     items: []
// };

// const List = mongoose.model("List", listSchema);

app.get("/", function(req, res) {
    
    const day = date.getDay();

    Item.find({}, function(err, foundItems) {
        res.render("list", {listTitle: day, newListItems: foundItems});
    });
});

app.post("/", function(req, res) {

    const itemName = req.body.newItem;
    // const listName = req.body.list;

    const item = new Item ({
        name: itemName
    });

    // if(listName == "Today") {
        item.save();
        res.redirect("/");
    // }
    // else {
    //     List.findOne({name: listName}, function(err, foundList) {
    //         foundList.items.push(item);
    //         foundList.save();
    //         res.redirect("/" + listName);
    //     });
    // }
});

app.post("/delete", function(req, res) {
    const checkedItemID = req.body.checkbox;

    Item.deleteOne({_id: checkedItemID}, function(err) {
        if(!err) {
            res.redirect("/");
        }
    });
});

// app.get("/:pageName", function (req, res) {
//     const pageName = req.params.pageName;

//     List.findOne({name: pageName}, function(err, foundList) {
//         if(!err) {
//             if(!foundList) {
//                 const list = new List ({
//                     name: pageName,
//                     items: Item.find({})
//                 });
//                 list.save();
//                 res.redirect("/" + pageName);
//             }
//             else {
//                 res.render("list", {listTitle: pageName.name, newListItems: foundList.items});
//             }
//         }
//     });
// });

app.get("/about", function(req, res) {
    res.render("about");
});

app.listen(3000, function() {
    console.log("server started at port 3000.")
});
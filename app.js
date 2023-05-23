// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
const items = [];
const workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {

  let day = date.getDay();
  
  res.render("list", { listTitle: day, items: items });
});


app.post("/", function (req, res) {
  console.log(req.body);
  const item = req.body.newItem;
  if(req.body.list === "Work to do List"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work to do List", items: workItems });
});

app.get("/about", function(req, res){
  res.render("about");
})

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

"use strict";

const express = require("express");
const path = require('path');

const genreRouter = require("./app/api/controllers/genre-controller");
const userRouter = require("./app/api/controllers/user-controller");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/genre/", genreRouter);
app.use("/user/", userRouter);

app.use("/mvlib-spa.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/mvlib-spa.js'));
})

app.use("/genre.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/genre.js'));
})
app.use("/genre-list.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/genre-list.js'));
})
app.use("/genre-update-form.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/genre-update-form.js'));
})
app.use("/user.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/user.js'));
})
app.use("/user-list.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/user-list.js'));
})
app.use("/user-update-form.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/user-update-form.js'));
})
app.use("/calls.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/calls.js'));
})

app.get("/*", function(req,res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(3000, () => {
    console.log("Express server listening on port 3000.")
});

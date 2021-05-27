"use strict";

const express = require("express");
const path = require('path');

const genreRouter = require("./app/api/controllers/genre-controller");
const userRouter = require("./app/api/controllers/user-controller");
const videoRouter = require("./app/api/controllers/video-controller");
const commentRouter = require("./app/api/controllers/comment-controller");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/genre/", genreRouter);
app.use("/user/", userRouter);
app.use("/video/", videoRouter);
app.use("/comment/", commentRouter);

app.use("/mvlib-spa.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/mvlib-spa.js'));
})

app.use("/video.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/video.js'));
})
app.use("/video-list.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/video-list.js'));
})
app.use("/video-update-form.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/video-update-form.js'));
})
app.use("/video-detail.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/video-detail.js'));
})
app.use("/comment.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/comment.js'));
})
app.use("/comment-list.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/comment-list.js'));
})
app.use("/comment-update-form.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/comment-update-form.js'));
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

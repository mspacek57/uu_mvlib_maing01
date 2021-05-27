"use strict";
const fs = require("fs");
const path = require("path");

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

// 1
const DEFAULT_STORAGE_PATH = path.join(__dirname, "storage", "comments.json");

class CommentDao {
    constructor(storagePath) {
        this.commentStoragePath = storagePath ? storagePath : DEFAULT_STORAGE_PATH;
    }

    // create
    async addComment(comment) {
        const comments = await this._loadAllComments();
        if (this._isDuplicate(comments, comment.id)) {
            const e = new Error(`Comment with id '${comment.id}' already exists.`);
            e.code = "DUPLICATE_CODE";
            throw e;
        }
        comments[comment.id] = comment;
        try {
            await wf(this._getStorageLocation(), JSON.stringify(comments, null, 2));
            return comment;
        } catch (error) {
            const e = new Error(`Failed to store comment with id '${comment.id}' to local storage.`);
            e.code = "FAILED_TO_STORE_COMMENT";
            throw e;
        }
    }

    // get
    async getComment(id) {
        const comments = await this._loadAllComments();
        if (comments[id]) {
            return comments[id];
        } else {
            const e = new Error(`Comment with id '${id}' does not exist.`);
            e.code = "FAILED_TO_GET_COMMENT";
            throw e;
        }
    }

    // update
    async updateComment(comment) {
        const comments = await this._loadAllComments();
        if (comments[comment.id]) {
            comments[comment.id] = comment;
            try {
                await wf(this._getStorageLocation(), JSON.stringify(comments, null, 2));
                return comment;
            } catch (error) {
                const e = new Error(`Failed to update comment with id '${comment.id}' in local storage.`);
                e.code = "FAILED_TO_UPDATE_COMMENT";
                throw e;
            }
        } else {
            const e = new Error(`Comment with id '${comment.id}' does not exist.`);
            e.code = "FAILED_TO_GET_COMMENT";
            throw e;
        }
    }

    // delete
    async deleteComment(id) {
        const comments = await this._loadAllComments();
        delete comments[id];
        try {
            await wf(this._getStorageLocation(), JSON.stringify(comments, null, 2));
            return undefined;
        } catch (error) {
            const e = new Error(`Failed to delete comment with id '${id}' in local storage.`);
            e.code = "FAILED_TO_DELETE_COMMENT";
            throw e;
        }
    }

    // list
    async listComments(video) {
        const comments = await this._loadAllComments();
        let commentList = [];
        for (let id in comments) {
            if (!video || comments[id].video == video.video) {
                commentList.push(comments[id]);
            }
        }
        return commentList;
    }

    // private
    async _loadAllComments() {
        let comments;
        try {
            comments = JSON.parse(await rf(this._getStorageLocation()));
        } catch (e) {
            if (e.code === 'ENOENT') {
                console.info("No storage found, initializing new one...");
                comments = {};
            } else {
                throw new Error("Unable to read from storage. Wrong data format. " + this._getStorageLocation());
            }
        }
        return comments;
    }

    _isDuplicate(comments, id) {
        return !!comments[id];
    }

    _getStorageLocation() {
        return this.commentStoragePath;
    }

}

module.exports = CommentDao;
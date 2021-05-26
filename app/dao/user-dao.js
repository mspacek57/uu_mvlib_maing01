"use strict";
const fs = require("fs");
const path = require("path");

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

// 1
const DEFAULT_STORAGE_PATH = path.join(__dirname, "storage", "genres.json");

class UserDao {
    constructor(storagePath) {
        this.userStoragePath = storagePath ? storagePath : DEFAULT_STORAGE_PATH;
    }

    // create
    async addUser(user) {
        const users = await this._loadAllUsers();
        if (this._isDuplicate(users, user.id)) {
            const e = new Error(`User with id '${user.id}' already exists.`);
            e.code = "DUPLICATE_CODE";
            throw e;
        }
        users[user.id] = user;
        try {
            await wf(this._getStorageLocation(), JSON.stringify(users, null, 2));
            return user;
        } catch (error) {
            const e = new Error(`Failed to store user with id '${user.id}' to local storage.`);
            e.code = "FAILED_TO_STORE_USER";
            throw e;
        }
    }

    // get
    async getUser(id) {
        const users = await this._loadAllUsers();
        if (users[id]) {
            return users[id];
        } else {
            const e = new Error(`User with id '${id}' does not exist.`);
            e.code = "FAILED_TO_GET_USER";
            throw e;
        }
    }

    // update
    async updateUser(user) {
        const users = await this._loadAllUsers();
        if (users[user.id]) {
            users[user.id] = user;
            try {
                await wf(this._getStorageLocation(), JSON.stringify(users, null, 2));
                return user;
            } catch (error) {
                const e = new Error(`Failed to update user with id '${user.id}' in local storage.`);
                e.code = "FAILED_TO_UPDATE_USER";
                throw e;
            }
        } else {
            const e = new Error(`User with id '${user.id}' does not exist.`);
            e.code = "FAILED_TO_GET_USER";
            throw e;
        }
    }

    // delete
    async deleteUser(id) {
        const users = await this._loadAllUsers();
        delete users[id];
        try {
            await wf(this._getStorageLocation(), JSON.stringify(users, null, 2));
            return undefined;
        } catch (error) {
            const e = new Error(`Failed to delete user with id '${id}' in local storage.`);
            e.code = "FAILED_TO_DELETE_USER";
            throw e;
        }
    }

    // list
    async listUsers(name) {
        const users = await this._loadAllUsers();
        let userList = [];
        for (let id in users) {
            if (!name || users[id].username.toLowerCase().includes(name.toLowerCase())) {
                userList.push(users[id]);
            }
        }
        return userList;
    }

    // private
    async _loadAllUsers() {
        let users;
        try {
            users = JSON.parse(await rf(this._getStorageLocation()));
        } catch (e) {
            if (e.code === 'ENOENT') {
                console.info("No storage found, initializing new one...");
                users = {};
            } else {
                throw new Error("Unable to read from storage. Wrong data format. " + this._getStorageLocation());
            }
        }
        return users;
    }

    _isDuplicate(users, id) {
        return !!users[id];
    }

    _getStorageLocation() {
        return this.userStoragePath;
    }

}

module.exports = UserDao;
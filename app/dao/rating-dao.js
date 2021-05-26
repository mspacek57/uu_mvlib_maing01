"use strict";
const fs = require("fs");
const path = require("path");

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

// 1
const DEFAULT_STORAGE_PATH = path.join(__dirname, "storage", "ratings.json");

class RatingDao {
    constructor(storagePath) {
        this.ratingStoragePath = storagePath ? storagePath : DEFAULT_STORAGE_PATH;
    }

    // create
    async addRating(rating) {
        const ratings = await this._loadAllRatings();
        if (this._isDuplicate(ratings, rating.id)) {
            const e = new Error(`Rating with id '${book.id}' already exists.`);
            e.code = "DUPLICATE_CODE";
            throw e;
        }
        ratingss[rating.id] = rating;
        try {
            await wf(this._getStorageLocation(), JSON.stringify(ratingss, null, 2));
            return rating;
        } catch (error) {
            const e = new Error(`Failed to store book with id '${book.id}' to local storage.`);
            e.code = "FAILED_TO_STORE_RATING";
            throw e;
        }
    }

    // get
    async getrating(id) {
        const ratingss = await this._loadAllratings();
        if (ratingss[id]) {
            return ratings[id];
        } else {
            const e = new Error(`Rating with id '${id}' does not exist.`);
            e.code = "FAILED_TO_GET_RATING";
            throw e;
        }
    }

    // update
    async updaterating(rating) {
        const ratings = await this._loadAllRatings();
        if (ratings[rating.id]) {
            ratings[rating.id] = rating;
            try {
                await wf(this._getStorageLocation(), JSON.stringify(ratingss, null, 2));
                return rating;
            } catch (error) {
                const e = new Error(`Failed to update rating with id '${rating.id}' in local storage.`);
                e.code = "FAILED_TO_UPDATE_RATING";
                throw e;
            }
        } else {
            const e = new Error(`Rating with id '${rating.id}' does not exist.`);
            e.code = "FAILED_TO_GET_RATING";
            throw e;
        }
    }

    // delete
    async deleteRating(id) {
        const ratings = await this._loadAllRatings();
        delete ratings[id];
        try {
            await wf(this._getStorageLocation(), JSON.stringify(ratings, null, 2));
            return undefined;
        } catch (error) {
            const e = new Error(`Failed to delete rating with id '${id}' in local storage.`);
            e.code = "FAILED_TO_DELETE_RATING";
            throw e;
        }
    }

    // list
    async listRatings(name) {
        const ratings = await this._loadAllratings();
        let ratingList = [];
        for (let id in ratings) {
            if (!name || ratings[id].name.toLowerCase().includes(name.toLowerCase())) {
                ratingList.push(ratings[id]);
            }
        }
        return ratingList;
    }

    // private
    async _loadAllratings() {
        let ratings;
        try {
            ratings = JSON.parse(await rf(this._getStorageLocation()));
        } catch (e) {
            if (e.code === 'ENOENT') {
                console.info("No storage found, initializing new one...");
                ratings = {};
            } else {
                throw new Error("Unable to read from storage. Wrong data format. " + this._getStorageLocation());
            }
        }
        return ratings;
    }

    _isDuplicate(ratings, id) {
        return !!ratings[id];
    }

    _getStorageLocation() {
        return this.ratingStoragePath;
    }

}

module.exports = RatingDao;
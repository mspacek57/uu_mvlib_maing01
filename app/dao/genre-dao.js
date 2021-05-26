"use strict";
const fs = require("fs");
const path = require("path");

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

// 1
const DEFAULT_STORAGE_PATH = path.join(__dirname, "storage", "genres.json");

class GenreDao {
    constructor(storagePath) {
        this.genreStoragePath = storagePath ? storagePath : DEFAULT_STORAGE_PATH;
    }

    // create
    async addGenre(genre) {
        const genres = await this._loadAllGenres();
        if (this._isDuplicate(genres, genre.id)) {
            const e = new Error(`Genre with id '${genre.id}' already exists.`);
            e.code = "DUPLICATE_CODE";
            throw e;
        }
        genres[genre.id] = genre;
        try {
            await wf(this._getStorageLocation(), JSON.stringify(genres, null, 2));
            return genre;
        } catch (error) {
            const e = new Error(`Failed to store genre with id '${genre.id}' to local storage.`);
            e.code = "FAILED_TO_STORE_GENRE";
            throw e;
        }
    }

    // get
    async getGenre(id) {
        const genres = await this._loadAllGenres();
        if (genres[id]) {
            return genres[id];
        } else {
            const e = new Error(`Genre '${id}' does not exist.`);
            e.code = "FAILED_TO_GET_GENRE";
            throw e;
        }
    }

    // update
    async updateGenre(genre) {
        const genres = await this._loadAllGenres();
        if (genres[genre.id]) {
            genres[genre.id] = genre;
            try {
                await wf(this._getStorageLocation(), JSON.stringify(genres, null, 2));
                return genre;
            } catch (error) {
                const e = new Error(`Failed to update genre with id '${genre.id}' in local storage.`);
                e.code = "FAILED_TO_UPDATE_GENRE";
                throw e;
            }
        } else {
            const e = new Error(`Genre with id '${genre.id}' does not exist.`);
            e.code = "FAILED_TO_GET_GENRE";
            throw e;
        }
    }

    // delete
    async deleteGenre(id) {
        const genres = await this._loadAllGenres();
        delete genres[id];
        try {
            await wf(this._getStorageLocation(), JSON.stringify(genres, null, 2));
            return undefined;
        } catch (error) {
            const e = new Error(`Failed to delete genre with id '${id}' in local storage.`);
            e.code = "FAILED_TO_DELETE_GENRE";
            throw e;
        }
    }

    // list
    async listGenres(name) {
        const genres = await this._loadAllGenres();
        let genreList = [];
        for (let id in genres) {
            if (!name || genres[id].name.toLowerCase().includes(name.toLowerCase())) {
                genreList.push(genres[id]);
            }
        }
        return genreList;
    }

    // private
    async _loadAllGenres() {
        let genres;
        try {
            genres = JSON.parse(await rf(this._getStorageLocation()));
        } catch (e) {
            if (e.code === 'ENOENT') {
                console.info("No storage found, initializing new one...");
                genres = {};
            } else {
                throw new Error("Unable to read from storage. Wrong data format. " + this._getStorageLocation());
            }
        }
        return genres;
    }

    _isDuplicate(genres, id) {
        return !!genres[id];
    }

    _getStorageLocation() {
        return this.genreStoragePath;
    }

}

module.exports = GenreDao;
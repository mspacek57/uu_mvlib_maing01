"use strict";
const fs = require("fs");
const path = require("path");

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

// 1
const DEFAULT_STORAGE_PATH = path.join(__dirname, "storage", "videos.json");

class VideoDao {
    constructor(storagePath) {
        this.videoStoragePath = storagePath ? storagePath : DEFAULT_STORAGE_PATH;
    }

    // create
    async addVideo(video) {
        const videos = await this._loadAllVideos();
        if (this._isDuplicate(videos, video.id)) {
            const e = new Error(`Video with id '${video.id}' already exists.`);
            e.code = "DUPLICATE_CODE";
            throw e;
        }
        videos[video.id] = video;
        try {
            await wf(this._getStorageLocation(), JSON.stringify(videos, null, 2));
            return video;
        } catch (error) {
            const e = new Error(`Failed to store video with id '${video.id}' to local storage.`);
            e.code = "FAILED_TO_STORE_VIDEO";
            throw e;
        }
    }

    // get
    async getVideo(id) {
        const videos = await this._loadAllVideos();
        if (videos[id]) {
            return videos[id];
        } else {
            const e = new Error(`Video with id '${id}' does not exist.`);
            e.code = "FAILED_TO_GET_VIDEO";
            throw e;
        }
    }

    // update
    async updateVideo(video) {
        const videos = await this._loadAllVideos();
        if (videos[video.id]) {
            videos[video.id] = video;
            try {
                await wf(this._getStorageLocation(), JSON.stringify(videos, null, 2));
                return video;
            } catch (error) {
                const e = new Error(`Failed to update video with id '${video.id}' in local storage.`);
                e.code = "FAILED_TO_UPDATE_VIDEO";
                throw e;
            }
        } else {
            const e = new Error(`Video with id '${video.id}' does not exist.`);
            e.code = "FAILED_TO_GET_VIDEO";
            throw e;
        }
    }

    // delete
    async deleteVideo(id) {
        const videos = await this._loadAllVideos();
        delete videos[id];
        try {
            await wf(this._getStorageLocation(), JSON.stringify(videos, null, 2));
            return undefined;
        } catch (error) {
            const e = new Error(`Failed to delete video with id '${id}' in local storage.`);
            e.code = "FAILED_TO_DELETE_VIDEO";
            throw e;
        }
    }

    // list
    async listVideos(name) {
        const videos = await this._loadAllVideos();
        let videoList = [];
        for (let id in videos) {
            if (!name || videos[id].title.toLowerCase().includes(name.toLowerCase())) {
                videoList.push(videos[id]);
            }
        }
        return videoList;
    }

    // private
    async _loadAllVideos() {
        let videos;
        try {
            videos = JSON.parse(await rf(this._getStorageLocation()));
        } catch (e) {
            if (e.code === 'ENOENT') {
                console.info("No storage found, initializing new one...");
                videos = {};
            } else {
                throw new Error("Unable to read from storage. Wrong data format. " + this._getStorageLocation());
            }
        }
        return videos;
    }

    _isDuplicate(videos, id) {
        return !!videos[id];
    }

    _getStorageLocation() {
        return this.videoStoragePath;
    }

}

module.exports = VideoDao;
const path = require("path");
const VideoDao = require("../../dao/video-dao");
let dao = new VideoDao(path.join(__dirname, "..", "..", "storage", "videos.json"))
const GenreDao = require("../../dao/genre-dao");
let genreDao = new GenreDao(path.join(__dirname, "..", "..", "storage", "genres.json"))

async function UpdateAbl(req, res) {
    let {id, title, artist, album, year, description, link, isRestricted, genre} = req.body;
    if (
        id && typeof id === "string" && id.length < 25 &&
        title && typeof title === "string" && title.length < 200 &&
        artist && typeof artist === "string" && artist.length < 200 &&
        typeof album === "string" && album.length < 200 &&
        typeof year === "string" && year.length < 5 &&
        typeof description === "string" && description.length < 200 &&
        link && typeof link === "string" && link.length < 200 &&
        typeof isRestricted === "boolean"
    ) {
        if (genre) {
            try {
                await genreDao.getGenre(genre)
            } catch (e) {
                if (e.code === "FAILED_TO_GET_GENRE") {
                    res.status(400).json({ error: e })
                } else {
                    res.status(500).json({ error: e })
                }
            }
        } else {genre=""}

        const video = {id, title, artist, album, year, description, link, isRestricted, genre};
        try {
            let result = await dao.updateVideo(video);
            res.status(200).json(result);
        } catch (e) {
            if (e.code === "FAILED_TO_GET_VIDEO") {
                res.status(400).json({error: e})
            } else if (e.code === "FAILED_TO_UPDATE_VIDEO") {
                res.status(500).json({error: e})
            } else {
                res.status(500).json({error: e})
            }
        }
    } else {
        res.status(400).json({
            "error": "Invalid dtoIn"
        })
    }
}

module.exports = UpdateAbl;
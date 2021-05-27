const path = require("path");
const CommentDao = require("../../dao/comment-dao");
let dao = new CommentDao(path.join(__dirname, "..", "..", "storage", "comments.json"))
const VideoDao = require("../../dao/video-dao");
let videoDao = new VideoDao(path.join(__dirname, "..", "..", "storage", "videos.json"))

async function CreateAbl(req, res) {
    let { id, text, video } = req.body;
    if (
        typeof text === "string" && text.length < 1000
    ) {
        id = 1;
        while(true){
            try {
                await dao.getComment(id)
            } catch (e) {
                if (e.code === "FAILED_TO_GET_COMMENT") {
                    break;
                } else {
                    res.status(500).json({ error: e })
                }
            }
            id++;
        }
        if (video) {
            try {
                await videoDao.getVideo(video)
            } catch (e) {
                if (e.code === "FAILED_TO_GET_VIDEO") {
                    res.status(400).json({ error: e })
                } else {
                    res.status(500).json({ error: e })
                }
            }
        } else {
            video = ""
        }


        const comment = { id, text, video };
        try {
            let result = await dao.addComment(comment);
            res.status(200).json(result);
        } catch (e) {
            if (e.code === "DUPLICATE_CODE") {
                res.status(400).json({ error: e })
            } else if (e.code === "FAILED_TO_STORE_COMMENT") {
                res.status(500).json({ error: e })
            } else {
                res.status(500).json({ error: e })
            }
        }
    } else {
        res.status(400).json({
            "error": "Invalid dtoIn"
        })
    }
}

module.exports = CreateAbl;
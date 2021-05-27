const path = require("path");
const CommentDao = require("../../dao/comment-dao");
let dao = new CommentDao(path.join(__dirname, "..", "..", "storage", "comments.json"))
const VideoDao = require("../../dao/video-dao");
let videoDao = new VideoDao(path.join(__dirname, "..", "..", "storage", "videos.json"))
const UserDao = require("../../dao/user-dao");
let userDao = new UserDao(path.join(__dirname, "..", "..", "storage", "users.json"))

async function UpdateAbl(req, res) {
    let { id, text, video, user } = req.body;
    if (
        typeof text === "string" && text.length < 1000 &&
        id && typeof id === "number" && id>0
    ) {
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
        if (user) {
            try {
                await userDao.getUser(user)
            } catch (e) {
                if (e.code === "FAILED_TO_GET_USER") {
                    res.status(400).json({ error: e })
                } else {
                    res.status(500).json({ error: e })
                }
            }
        } else {
            user = ""
        }


        const comment = {id, text, video, user};
        try {
            let result = await dao.updateComment(comment);
            res.status(200).json(result);
        } catch (e) {
            if (e.code === "FAILED_TO_GET_COMMENT") {
                res.status(400).json({error: e})
            } else if (e.code === "FAILED_TO_UPDATE_COMMENT") {
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
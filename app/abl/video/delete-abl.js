const path = require("path");
const VideoDao = require("../../dao/video-dao");
let dao = new VideoDao(path.join(__dirname, "..", "..", "storage", "videos.json"))

async function DeleteAbl(req, res) {
    let {id} = req.body;
    if (
        id && typeof id === "number" && id>0
    ) {
        try {
            await dao.deleteVideo(id);
            res.status(200).json({});
        } catch (e) {
            if (e.code === "FAILED_TO_DELETE_VIDEO") {
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

module.exports = DeleteAbl;
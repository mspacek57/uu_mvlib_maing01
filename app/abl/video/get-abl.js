const path = require("path");
const VideoDao = require("../../dao/video-dao");
let dao = new VideoDao(path.join(__dirname, "..", "..", "storage", "videos.json"))


async function GetAbl(req, res) {
    let {id} = req.query;
    if (
        id && typeof id === "string"
    ) {
        try {
            let result = await dao.getVideo(id);
            res.status(200).json(result);
        } catch (e) {
            if (e.code === "FAILED_TO_GET_VIDEO") {
                res.status(400).json({error: e})
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

module.exports = GetAbl;
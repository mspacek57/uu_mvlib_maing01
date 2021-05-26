const path = require("path");
const VideoDao = require("../../dao/video-dao");
let dao = new VideoDao(path.join(__dirname, "..", "..", "storage", "videos.json"))

async function ListAbl(req, res) {
    let {title} = req.body;
    if (
        !title || (title && typeof title === "string" && title.length < 30)
    ) {
        try {
            let titleList = await dao.listVideos(title);
            res.status(200).json({itemList: titleList, total: titleList.length});
        } catch (e) {
            res.status(500).json({error: e})
        }
    } else {
        res.status(400).json({
            "error": "Invalid dtoIn"
        })
    }
}

module.exports = ListAbl;
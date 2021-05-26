const path = require("path");
const CommentDao = require("../../dao/comment-dao");
let dao = new CommentDao(path.join(__dirname, "..", "..", "storage", "comment.json"))

async function ListAbl(req, res) {
    let {video} = req.body;
    if (
        !video || (video && typeof video === "string" && video.length < 25)
    ) {
        try {
            let commentList = await dao.listComments(video);
            res.status(200).json({itemList: commentList, total: commentList.length});
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
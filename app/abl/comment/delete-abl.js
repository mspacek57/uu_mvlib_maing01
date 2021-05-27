const path = require("path");
const CommentDao = require("../../dao/comment-dao");
let dao = new CommentDao(path.join(__dirname, "..", "..", "storage", "comments.json"))

async function DeleteAbl(req, res) {
    let {id} = req.body;
    if (
        id && typeof id === "number" && id>0
    ) {
        try {
            await dao.deleteComment(id);
            res.status(200).json({});
        } catch (e) {
            if (e.code === "FAILED_TO_DELETE_COMMENT") {
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
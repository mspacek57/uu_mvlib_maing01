const path = require("path");
const CommentDao = require("../../dao/comment-dao");
let dao = new CommentDao(path.join(__dirname, "..", "..", "storage", "comments.json"))


async function GetAbl(req, res) {
    let {id} = req.query;
    if (
        id && typeof id === "string" && id.length < 25
    ) {
        try {
            let result = await dao.getComment(id);
            res.status(200).json(result);
        } catch (e) {
            if (e.code === "FAILED_TO_GET_COMMENT") {
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
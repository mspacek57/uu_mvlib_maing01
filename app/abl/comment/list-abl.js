const path = require("path");
const CommentDao = require("../../dao/comment-dao");
let dao = new CommentDao(path.join(__dirname, "..", "..", "storage", "comment.json"))

async function ListAbl(req, res) {
    let {id} = req.body;
    if (
        !id || (id && typeof id === "string" && id.length < 25)
    ) {
        try {
            let commentList = await dao.listComments(id);
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
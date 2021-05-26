const path = require("path");
const CommentDao = require("../../dao/comment-dao");
let dao = new CommentDao(path.join(__dirname, "..", "..", "storage", "comment.json"))

async function UpdateAbl(req, res) {
    let {id, name} = req.body;
    if (
        (id && typeof id === "string" && id.length < 25) &&
        (name && typeof name === "string" && name.length < 200)
    ) {
        const comment = {id, name};
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
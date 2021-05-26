const path = require("path");
const RatingDao = require("../../dao/Rating-dao");
let dao = new RatingDao(path.join(__dirname, "..", "..", "storage", "Rating.json"))

async function DeleteAbl(req, res) {
    let {id} = req.body;
    if (
        id && typeof id === "string" && id.length < 25
    ) {
        try {
            await dao.deleteRating(id);
            res.status(200).json({});
        } catch (e) {
            if (e.code === "FAILED_TO_DELETE_RATING") {
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
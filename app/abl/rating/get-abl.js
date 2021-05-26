const path = require("path");
const RatingDao = require("../../dao/rating-dao");
let dao = new RatingDao(path.join(__dirname, "..", "..", "storage", "Rating.json"))


async function GetAbl(req, res) {
    let {id} = req.query;
    if (
        id && typeof id === "string" && id.length < 25
    ) {
        try {
            let result = await dao.getRating(id);
            res.status(200).json(result);
        } catch (e) {
            if (e.code === "FAILED_TO_GET_RATING") {
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
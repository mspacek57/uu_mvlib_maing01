const path = require("path");
const RatingDao = require("../../dao/rating-dao");
let dao = new RatingDao(path.join(__dirname, "..", "..", "storage", "rating.json"))

async function UpdateAbl(req, res) {
    let {id, name} = req.body;
    if (
        (id && typeof id === "string" && id.length < 25) &&
        (name && typeof name === "string" && name.length < 200)
    ) {
        const rating = {id, name};
        try {
            let result = await dao.updateRaiting(raiting);
            res.status(200).json(result);
        } catch (e) {
            if (e.code === "FAILED_TO_GET_RATING") {
                res.status(400).json({error: e})
            } else if (e.code === "FAILED_TO_UPDATE_RATING") {
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
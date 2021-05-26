const path = require("path");
const RatingDao = require("../../dao/rating-dao");
let dao = new RatingDao(path.join(__dirname, "..", "..", "storage", "rating.json"))

async function ListAbl(req, res) {
    let {name} = req.body;
    if (
        !name || (name && typeof name === "string" && name.length < 30)
    ) {
        try {
            let ratingList = await dao.listRating(name);
            res.status(200).json({itemList: ratingList, total: ratingList.length});
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
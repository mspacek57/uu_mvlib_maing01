const path = require("path");
const GenreDao = require("../../dao/genre-dao");
let dao = new GenreDao(path.join(__dirname, "..", "..", "storage", "genres.json"))


async function GetAbl(req, res) {
    let {id} = req.query;
    if (
        id && typeof id === "string"
    ) {
        try {
            let result = await dao.getGenre(id);
            res.status(200).json(result);
        } catch (e) {
            if (e.code === "FAILED_TO_GET_GENRE") {
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
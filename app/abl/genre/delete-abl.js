const path = require("path");
const GenreDao = require("../../dao/genre-dao");
let dao = new GenreDao(path.join(__dirname, "..", "..", "storage", "genres.json"))

async function DeleteAbl(req, res) {
    let {id} = req.body;
    if (
        id && typeof id === "string" && id.length < 25
    ) {
        try {
            await dao.deleteGenre(id);
            res.status(200).json({});
        } catch (e) {
            if (e.code === "FAILED_TO_DELETE_GENRE") {
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
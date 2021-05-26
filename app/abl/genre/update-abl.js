const path = require("path");
const GenreDao = require("../../dao/genre-dao");
let dao = new GenreDao(path.join(__dirname, "..", "..", "storage", "genres.json"))

async function UpdateAbl(req, res) {
    let {id, name} = req.body;
    if (
        (id && typeof id === "string" && id.length < 25) &&
        (name && typeof name === "string" && name.length < 200)
    ) {
        const genre = {id, name};
        try {
            let result = await dao.updateGenre(genre);
            res.status(200).json(result);
        } catch (e) {
            if (e.code === "FAILED_TO_GET_GENRE") {
                res.status(400).json({error: e})
            } else if (e.code === "FAILED_TO_UPDATE_GENRE") {
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
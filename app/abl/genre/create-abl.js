const path = require("path");
const GenreDao = require("../../dao/genre-dao");
let dao = new GenreDao(path.join(__dirname, "..", "..", "storage", "genres.json"))

async function CreateAbl(req, res) {
    let {id, name} = req.body;
    if (
        name && typeof name === "string" && name.length < 200 &&
        id && typeof id === "string" && id.length < 25
    ) {
        const genre = {id, name};
        try {
            let result = await dao.addGenre(genre);
            res.status(200).json(result);
        } catch (e) {
            if (e.code === "DUPLICATE_CODE") {
                res.status(400).json({error: e})
            } else if (e.code === "FAILED_TO_STORE_GENRE") {
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

module.exports = CreateAbl;
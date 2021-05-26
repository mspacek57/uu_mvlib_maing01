const path = require("path");
const GenreDao = require("../../dao/genre-dao");
let dao = new GenreDao(path.join(__dirname, "..", "..", "storage", "genres.json"))

async function ListAbl(req, res) {
    let {name} = req.body;
    if (
        !name || (name && typeof name === "string" && name.length < 30)
    ) {
        try {
            let genreList = await dao.listGenres(name);
            res.status(200).json({itemList: genreList, total: genreList.length});
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
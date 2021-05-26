const path = require("path");
const UserDao = require("../../dao/user-dao");
let dao = new UserDao(path.join(__dirname, "..", "..", "storage", "users.json"))

async function DeleteAbl(req, res) {
    let {id} = req.body;
    if (
        id && typeof id === "string" && id.length < 25
    ) {
        try {
            await dao.deleteUser(id);
            res.status(200).json({});
        } catch (e) {
            if (e.code === "FAILED_TO_DELETE_USER") {
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
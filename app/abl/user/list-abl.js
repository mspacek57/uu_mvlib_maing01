const path = require("path");
const UserDao = require("../../dao/user-dao");
let dao = new UserDao(path.join(__dirname, "..", "..", "storage", "users.json"))

async function ListAbl(req, res) {
    let {name} = req.body;
    if (
        !name || (name && typeof name === "string" && name.length < 30)
    ) {
        try {
            let userList = await dao.listUsers(name);
            res.status(200).json({itemList: userList, total: userList.length});
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
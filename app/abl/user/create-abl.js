const path = require("path");
const UserDao = require("../../dao/user-dao");
let dao = new UserDao(path.join(__dirname, "..", "..", "storage", "users.json"))

async function CreateAbl(req, res) {
    let {id, username, password} = req.body;
    if (
        id && typeof id === "string" && id.length < 25 &&
        username && typeof username === "string" && username.length < 50 &&
        password && typeof password === "string" && password.length < 50
    ) {
        const user = {id, username, password};
        try {
            let result = await dao.addUser(user);
            res.status(200).json(result);
        } catch (e) {
            if (e.code === "DUPLICATE_CODE") {
                res.status(400).json({error: e})
            } else if (e.code === "FAILED_TO_STORE_USER") {
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
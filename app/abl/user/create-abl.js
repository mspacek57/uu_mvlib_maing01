const path = require("path");
const UserDao = require("../../dao/user-dao");
let dao = new UserDao(path.join(__dirname, "..", "..", "storage", "users.json"))

async function CreateAbl(req, res) {
    let {id, username, password} = req.body;
    if (
        username && typeof username === "string" && username.length < 50 &&
        password && typeof password === "string" && password.length < 50
    ) {
        id = 1;
        while(true){
            try {
                await dao.getUser(id)
            } catch (e) {
                if (e.code === "FAILED_TO_GET_USER") {
                    break;
                } else {
                    res.status(500).json({ error: e })
                }
            }
            id++;
        }
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
/**
 * Server calls of application client.
 */
import { Client } from "uu_appg01";

const call = async (method, uri, dtoIn) => {
    let response = await Client[method](uri, dtoIn, {});
    return response.data;
};

let Calls = {
    /** URL containing app base, e.g. "https://uuos9.plus4u.net/vnd-app/awid/". */


    createVideo(dtoIn) {
        let commandUri = Calls.getCommandUri("video/create");
        return call("post", commandUri, dtoIn.data);
    },

    getVideo(dtoIn) {
        let commandUri = Calls.getCommandUri("video/get");
        return call("get", commandUri, dtoIn.data);
    },

    updateVideo(dtoIn) {
        let commandUri = Calls.getCommandUri("video/update");
        return call("post", commandUri, dtoIn.data);
    },

    deleteVideo(dtoIn) {
        let commandUri = Calls.getCommandUri("video/delete");
        return call("post", commandUri, dtoIn.data);
    },

    listVideo(dtoIn) {
        let commandUri = Calls.getCommandUri("video/list");
        return call("get", commandUri, dtoIn.data);
    },
    createGenre(dtoIn) {
        let commandUri = Calls.getCommandUri("genre/create");
        return call("post", commandUri, dtoIn.data);
    },

    getGenre(dtoIn) {
        let commandUri = Calls.getCommandUri("genre/get");
        return call("get", commandUri, dtoIn.data);
    },

    updateGenre(dtoIn) {
        let commandUri = Calls.getCommandUri("genre/update");
        return call("post", commandUri, dtoIn.data);
    },

    deleteGenre(dtoIn) {
        let commandUri = Calls.getCommandUri("genre/delete");
        return call("post", commandUri, dtoIn.data);
    },

    listGenre(dtoIn) {
        let commandUri = Calls.getCommandUri("genre/list");
        return call("get", commandUri, dtoIn.data);
    },

    createUser(dtoIn) {
        let commandUri = Calls.getCommandUri("user/create");
        return call("post", commandUri, dtoIn.data);
    },

    getUser(dtoIn) {
        let commandUri = Calls.getCommandUri("user/get");
        return call("get", commandUri, dtoIn.data);
    },

    updateUser(dtoIn) {
        let commandUri = Calls.getCommandUri("user/update");
        return call("post", commandUri, dtoIn.data);
    },

    deleteUser(dtoIn) {
        let commandUri = Calls.getCommandUri("user/delete");
        return call("post", commandUri, dtoIn.data);
    },

    listUser(dtoIn) {
        let commandUri = Calls.getCommandUri("user/list");
        return call("get", commandUri, dtoIn.data);
    },



    /*
    For calling command on specific server, in case of developing client site with already deployed
    server in uuCloud etc. You can specify url of this application (or part of url) in development
    configuration in *-client/env/development.json, for example:
     {
       ...
       "uu5Environment": {
         "gatewayUri": "https://uuos9.plus4u.net",
         "tid": "84723877990072695",
         "awid": "b9164294f78e4cd51590010882445ae5",
         "vendor": "uu",
         "app": "demoappg01",
         "subApp": "main"
       }
     }
     */
    getCommandUri(aUseCase, uri = "http://localhost:3000") {
        // useCase <=> e.g. "getSomething" or "sys/getSomething"
        // add useCase to the application base URI
        if (uri.charAt(uri.length - 1) !== "/") uri += "/";
        return uri + aUseCase.replace(/^\/+/, "");
    },
};

export default Calls;

// #region Global Imports
// import dotenv from "dotenv";
import next from "next";
import express from "express";
import path from "path";
import nextI18NextMiddleware from "next-i18next/middleware";

// #endregion Global Imports

// #region Local Imports
import nextI18next from "./i18n";
import routes from "./routes";
import devProxy from "./proxy";

const fs = require("fs");
// #endregion Local Imports

const port = parseInt(process.env.PORT || "3000", 10);
let dev = true;
let env = "local";
if (process.env.APP_ENV) {
    dev = false;
    env = process.env.APP_ENV;
}
console.log(17, dev);
console.log(22, env);

const configPath = `${__dirname}/../config/.env.${env}`;
if (!fs.existsSync(configPath)) {
    console.error("> env file not exists > ", configPath);
    process.exit(11);
} else {
    console.log("File exsist");
}
console.log(25, configPath);

require("dotenv").config({ path: configPath });

const app = next({ dev });
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
    const server = express();

    app.setAssetPrefix(process.env.STATIC_PATH || "");
    server.use(express.static(path.join(__dirname, "../public/static")));
    server.use(nextI18NextMiddleware(nextI18next));

    if (process.env.PROXY_MODE === "local") {
        // eslint-disable-next-line global-require
        const proxyMiddleware = require("http-proxy-middleware");
        Object.keys(devProxy).forEach(context => {
            server.use(proxyMiddleware(context, devProxy[context]));
        });
    }

    server.use(handler);
    server.listen(port);
});

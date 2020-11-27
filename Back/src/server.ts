import serverlessHttp from "serverless-http";

import app from "./app";

const _handler = serverlessHttp(app);
exports.handler = async (event, context) => {
    const result = await _handler(event, context);
    return result;
};

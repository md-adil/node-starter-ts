const port = process.env.APP_PORT;
export default {
    key: process.env.APP_KEY,
    port: port ? parseInt(port) : 3000,
    host: process.env.APP_HOST || "127.0.0.1"
};

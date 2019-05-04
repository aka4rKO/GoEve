const Express = require("express");
const BodyParser = require("body-parser");

const app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({
    extended: true
}));

app.listen(process.env.PORT, () => {
    console.log("Connection started");
});
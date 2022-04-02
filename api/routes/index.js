const bodyParser = require("body-parser");
const orders = require("./ordersRoute");

module.exports = (app) => {
  app.use(bodyParser.json(), orders);
  app.get("/", (req, res) =>
    res.status(200).send({ mensagem: "Bem vindo a API" })
  );
};

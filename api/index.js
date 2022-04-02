"use strict";

const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const app = express();
const port = 3333;

app.use(cors());
routes(app);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

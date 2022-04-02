const { Router } = require("express");
const OrdersController = require("../controllers/OrdersController");
const router = Router();

//Rotas Gerais
router.get("/orders", OrdersController.pegarTodosPedidos);
router.post("/orders", OrdersController.criarPedido);
//Rota das questões

//QUESTÃO 1
router.get("/orders/1/:reg_destino", OrdersController.pedidosDestino1);
//QUESTÃO 2
router.get("/orders/2/:isvalid", OrdersController.pedidosValidoseInvalidos);
//QUESTÃO 3
router.get(
  "/orders/3/:reg_origem/:tipo_produto",
  OrdersController.origemSulBrinquedos
);
//QUESTÃO 4
router.get("/orders/4/:reg_destino", OrdersController.listarPorRegiaoValidos);
//QUESTÃO 5
router.get(
  "/orders/5/:cod_vendedor",
  OrdersController.listarPedidosPorVendedor
);
//QUESTÃO 6
router.get("/orders/6/:reg_destino", OrdersController.listarPedidosPorDestino);
router.get(
  "/orders/6/2/:tipo_produto",
  OrdersController.listarPedidosPorTipodeProduto
);
//QUESTÃO 7
router.get("/orders/7", OrdersController.pedidosParaNorteeCentroOeste);
//QUESTÃO 10
router.get("/orders/10", OrdersController.ListaDePacotesInvalidos);

module.exports = router;

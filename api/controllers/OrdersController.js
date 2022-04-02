const database = require("../models");
const { Op } = require("sequelize");

class OrdersController {
  static async pegarTodosPedidos(req, res) {
    try {
      const pedidos = await database.Orders.findAll();

      return res.status(200).json(pedidos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async criarPedido(req, res) {
    const {
      codigo,
      reg_origem,
      reg_destino,
      cod_loggi,
      cod_vendedor,
      tipo_produto,
    } = req.body;
    var isvalid = true;
    var invalidObs = "";

    const orderExist = await database.Orders.findOne({
      where: { codigo: codigo },
    });
    if (orderExist) {
      return res.status(200).json("Pedido já existente");
    }

    //TIPO DE PRODUTO
    var produto;
    switch (tipo_produto) {
      case "001":
        produto = "Jóias";
        break;
      case "111":
        produto = "Livros";
        break;
      case "333":
        produto = "Eletrônico";
        break;
      case "555":
        produto = "Bebidas";
        break;
      case "888":
        produto = "Brinquedos";
        break;
      default:
        isvalid = false;
        invalidObs = "Código do tipo de Produto Inválido";
    }

    //REGIÃO DE ORIGEM
    var REG_ORIGEM = parseInt(reg_origem);
    var origem;
    if (REG_ORIGEM >= 201 && REG_ORIGEM <= 299) {
      origem = "Centro-Oeste";
    } else if (REG_ORIGEM >= 300 && REG_ORIGEM <= 399) {
      origem = "Nordeste";
    } else if (REG_ORIGEM >= 400 && REG_ORIGEM <= 499) {
      origem = "Norte";
    } else if (REG_ORIGEM >= 1 && REG_ORIGEM <= 99) {
      origem = "Sudeste";
    } else if (REG_ORIGEM >= 100 && REG_ORIGEM <= 199) {
      origem = "Sul";
    } else {
      isvalid = false;
      invalidObs = "Código da Região de Origem Inválido";
    }

    //REGIÃO DE DESTINO
    var REG_DESTINO = parseInt(reg_destino);
    var destino;
    if (REG_DESTINO >= 201 && REG_DESTINO <= 299) {
      destino = "Centro-oeste";
    } else if (REG_DESTINO >= 300 && REG_DESTINO <= 399) {
      destino = "Nordeste";
    } else if (REG_DESTINO >= 400 && REG_DESTINO <= 499) {
      destino = "Norte";
    } else if (REG_DESTINO >= 1 && REG_DESTINO <= 99) {
      destino = "Sudeste";
    } else if (REG_DESTINO >= 100 && REG_DESTINO <= 199) {
      destino = "Sul";
    } else {
      isvalid = false;
      invalidObs = "Código da Região de Destino Inválido";
    }

    if (produto === "Jóias" && origem === "Centro-Oeste") {
      isvalid = false;
      invalidObs =
        "Não é possível despachar pacotes contendo jóias tendo como região de origem o Centro-oeste";
    }

    var vendedorInativo = "367";
    if (cod_vendedor === vendedorInativo) {
      isvalid = false;
      invalidObs = `O vendedor ${cod_vendedor} está com seu CNPJ inativo e, portanto, não pode mais enviar pacotes pela Loggi`;
    }

    try {
      const order = await database.Orders.create({
        codigo,
        reg_origem: origem,
        reg_destino: destino,
        cod_loggi,
        cod_vendedor,
        tipo_produto: produto,
        isvalid,
        invalidObs,
      });

      return res.status(201).json(order);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pedidosDestino1(req, res) {
    const { reg_destino } = req.params;
    try {
      const pedidos = await database.Orders.findAndCountAll({
        where: { reg_destino: reg_destino },
      });

      return res.status(200).json(pedidos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pedidosValidoseInvalidos(req, res) {
    const { isvalid } = req.params;

    try {
      const pedidos = await database.Orders.findAndCountAll({
        where: { isvalid: isvalid },
      });

      return res.status(200).json(pedidos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async origemSulBrinquedos(req, res) {
    const { reg_origem, tipo_produto } = req.params;

    try {
      const pedidos = await database.Orders.findAll({
        where: { reg_origem: reg_origem, tipo_produto: tipo_produto },
      });

      return res.status(200).json(pedidos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async listarPorRegiaoValidos(req, res) {
    const { reg_destino } = req.params;

    try {
      const pedidos = await database.Orders.findAll({
        where: { reg_destino: reg_destino, isvalid: true },
      });

      return res.status(200).json(pedidos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async listarPedidosPorVendedor(req, res) {
    const { cod_vendedor } = req.params;

    try {
      const pedidos = await database.Orders.findAndCountAll({
        where: { cod_vendedor: cod_vendedor, isvalid: true },
      });

      return res.status(200).json(pedidos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async listarPedidosPorDestino(req, res) {
    const { reg_destino } = req.params;

    try {
      const pedidos = await database.Orders.findAll({
        where: { reg_destino: reg_destino, isvalid: true },
      });

      return res.status(200).json(pedidos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async listarPedidosPorTipodeProduto(req, res) {
    const { tipo_produto } = req.params;

    try {
      const pedidos = await database.Orders.findAll({
        where: { tipo_produto: tipo_produto, isvalid: true },
      });

      return res.status(200).json(pedidos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pedidosParaNorteeCentroOeste(req, res) {
    try {
      const pedidos = await database.Orders.findAll({
        where: {
          reg_destino: {
            [Op.or]: ["Norte", "Centro-Oeste"],
            isvalid: true,
          },
        },
      });

      return res.status(200).json(pedidos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async ListaDePacotesInvalidos(req, res) {
    try {
      const pedidos = await database.Orders.findAll({
        where: {
          isvalid: false,
        },
      });

      return res.status(200).json(pedidos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = OrdersController;

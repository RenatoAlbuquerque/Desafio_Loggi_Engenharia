//SIMULAÇÃO DE DADOS VINDOS DO FRONT-END

//RECEBIMENTO DO CODIGO DE BARRAS PELO BACK-END
const COD_BARRAS = ["123123123123123"];
var reg_origem = COD_BARRAS.slice(0, 3);
var reg_destino = COD_BARRAS.slice(3, 6);
var cod_loggi = COD_BARRAS.slice(6, 9);
var cod_vendedor = COD_BARRAS.slice(9, 12);
var tipo_produto = COD_BARRAS.slice(12, 15);

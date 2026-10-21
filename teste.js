const http = require('http');

const dados = JSON.stringify({ nome: 'Boné', preco: 39.9 });

const pedido = http.request({
  hostname: '127.0.0.1',
  port: 3000,
  path: '/produtos',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(dados)
  }
}, (resposta) => {
  let corpo = '';
  resposta.on('data', parte => corpo += parte);
  resposta.on('end', () => console.log('Status:', resposta.statusCode, '| Resposta:', corpo));
});

pedido.on('error', erro => console.log('Erro:', erro.message));
pedido.write(dados);
pedido.end();
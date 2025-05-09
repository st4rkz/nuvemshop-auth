const express = require('express');
const axios = require('axios');
const qs = require('qs');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Servidor online. Use /oauth?code=...');
});

app.get('/oauth', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send('Faltando parâmetro ?code=');

  const payload = qs.stringify({
    client_id: '17777',
    client_secret: '4926c9e771a97fdd4a0901a25d7c5137145fafe2b8edbbb2',
    code: code,
    grant_type: 'authorization_code',
    redirect_uri: 'https://api-node-nuvemshop.onrender.com/oauth'
  });

  try {
    const response = await axios.post('https://www.nuvemshop.com/apps/token', payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    });

    res.status(200).json({
      message: 'Token recebido com sucesso!',
      resultado: response.data
    });
  } catch (error) {
    res.status(500).json({
      erro: 'Falha ao obter o access_token',
      detalhes: error.response?.data || error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

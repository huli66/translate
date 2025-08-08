import express from 'express';
import { baiduTranslate, baiduFieldTranslate } from './src/server.js';

const app = express();
app.use(express.json());

app.post('/translate', async (req, res) => {
  const { queryArr, from, to } = req.body;
  const result = await baiduTranslate(queryArr, from, to);
  res.send(result);
});

app.post('/fieldtranslate', async (req, res) => {
  const { queryArr, from, to } = req.body;
  const result = await baiduFieldTranslate(queryArr, from, to);
  res.send(result);
});

/**
 * 更新 redis 中的数据
 */
app.post('/updateTranslatedText', async (req, res) => {
  const { queryArr, from, to } = req.body;
  const result = await baiduFieldTranslate(queryArr, from, to);
  res.send(result);
});

/**
 * 先从 redis 取，没有则调用接口
 */
app.post('/queryTranslatedText', async (req, res) => {
  const { queryArr, from, to } = req.body;
  const result = await baiduFieldTranslate(queryArr, from, to);
  res.send(result);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

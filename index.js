import express from 'express';
import { baiduTranslate, baiduFieldTranslate } from './src/server.js';
import { getVals, setVal } from './src/db.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

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
  // 从 redis 取，取不到的 key 调用接口
  const redisVals = await getVals(queryArr);
  console.log('redisVals', redisVals);
  const resultObj = [];
  const tranlateArr = [];
  for (let i = 0; i < queryArr.length; i++) {
    if (redisVals[i]) {
      resultObj.push({ key: queryArr[i], value: redisVals[i] });
    } else {
      tranlateArr.push(queryArr[i]);
    }
  }
  console.log('transferArr', tranlateArr);
  if (tranlateArr.length === 0) {
    res.send({
      from: from,
      to: to,
      resultObj,
      tranlateArr
    });
    return;
  }
  const tranlateResult = await baiduFieldTranslate(tranlateArr, from, to);
  tranlateResult.trans_result.forEach(item => {
    resultObj.push({ key: item.src, value: item.dst });
    setVal(item.src, item.dst);
  });
  console.log('resultObj', resultObj);
  res.send({
    from: tranlateResult.from,
    to: tranlateResult.to,
    resultObj,
    tranlateArr
  });
});

app.listen(3090, () => {
  console.log('Server is running on port 3090');
});

import MD5 from 'md5';

const baiduTranslateUrl = 'http://api.fanyi.baidu.com/api/trans/vip/translate';
const baiduFieldTranslateUrl = 'https://fanyi-api.baidu.com/api/trans/vip/fieldtranslate';
const domain = 'finance';
const appid = '20250806002425439';
const key = 'CfhJmkfGMa8y9lAjxNxt';

async function baiduTranslate(queryArr, from, to) {
  const salt = new Date().getTime().toString();
  const query = queryArr.join('\n');

  const paramStr = new URLSearchParams();
  paramStr.append('q', query);
  paramStr.append('from', from);
  paramStr.append('to', to);
  paramStr.append('appid', appid);
  paramStr.append('salt', salt);
  const sign = MD5(appid + query + salt + key);
  paramStr.append('sign', sign);

  const str = paramStr.toString();
  console.log('str', str);
  const res = await fetch(
    baiduTranslateUrl + '?' + str,
    {
      method: 'GET',
    }
  );
  const data = await res.json();
  console.log('res', data);
  return data;
};

async function baiduFieldTranslate(queryArr, from, to) {
  const salt = new Date().getTime().toString();
  const query = queryArr.join('\n');

  const paramStr = new URLSearchParams();
  paramStr.append('q', query);
  paramStr.append('from', from);
  paramStr.append('to', to);
  paramStr.append('appid', appid);
  paramStr.append('salt', salt);
  paramStr.append('domain', domain);
  const sign = MD5(appid + query + salt + domain + key);
  paramStr.append('sign', sign);

  const str = paramStr.toString();
  console.log('str', str);
  const res = await fetch(
    baiduFieldTranslateUrl + '?' + str,
    {
      method: 'GET',
    }
  );
  const data = await res.json();
  console.log('res', data);
  return data;
}

export { baiduTranslate, baiduFieldTranslate };

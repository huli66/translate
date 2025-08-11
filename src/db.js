import {createClient} from 'redis';

let redisHost = 'redis://127.0.0.1:6379';
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  redisHost = 'redis://139.196.212.116:6379';
}
console.log('redisHost', redisHost);

const client = createClient({
    url: redisHost
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

client.on('connect', () => {
    console.log('Redis connected');
});

await client.connect();

export const setVal = async (key, value) => {
    await client.set(key, value);
}

export const getVal = async (key) => {
    return await client.get(key);
}

export const getVals = async (keys) => {
    return await client.mGet(keys);
}

export default client;
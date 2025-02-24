// utils/klaviyoClient.ts
import axios from 'axios';

const KLAVIYO_API_KEY = process.env.NEXT_PUBLIC_KLAVIYO_PRIVATE_API_KEY;

const klaviyoClient = axios.create({
  baseURL: 'https://a.klaviyo.com/api',
  headers: {
    Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
    'Content-Type': 'application/vnd.api+json',
    accept: 'application/vnd.api+json',
    revision: '2024-10-15',
  },
});

export default klaviyoClient;
const LOCAL = 'http://localhost:5000';
const PROD = 'https://server-listshopmom.up.railway.app';

export const API_BASE_URL = import.meta.env.MODE === 'development' ? LOCAL : PROD;

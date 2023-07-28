import axios from "axios";
const BASE_PROD_URL = 'https://long-tan-rabbit-kit.cyclic.app/api'
const BASE_DEV_URL = 'http://localhost:5000/api';
const RETURN_TOKENIZEZ_REQ = ()=>axios.create({ headers: { token: `Bearer ${localStorage.getItem('token')}`}});
export {BASE_DEV_URL, BASE_PROD_URL, RETURN_TOKENIZEZ_REQ};
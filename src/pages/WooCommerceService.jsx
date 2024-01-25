// WoocommerceService.jsx
import axios from 'axios';

const WooCommerce = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer YOUR_API_KEY',
  },
});

export default WooCommerce;

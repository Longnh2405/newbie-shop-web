import { PRODUCT_URL } from 'constants/api';
import httpService from './httpServices';

class ProductService {
    getProduct(params) {
        const convertParams = new URLSearchParams(params)
        return httpService.get(PRODUCT_URL, { params: convertParams });
    }
    getDetailProduct(id) {
        return httpService.get(`${PRODUCT_URL}/${id}`)
    }
    addProduct(data) {
        return httpService.post(PRODUCT_URL, data)
    }
    updateProduct(payload) {
        const { data, id } = payload;
        return httpService.put(`${PRODUCT_URL}/${id}`, data)
    }
    deleteProduct(id) {
        return httpService.delete(`${PRODUCT_URL}/${id}`)
    }
}

export default new ProductService();

import { CATALOG_MANAGE_URL, ORDER_URL } from 'constants/api';
import httpService from './httpServices';

class OrderService {
    addOrder(data) {
        return httpService.post(ORDER_URL, data)
    }
    getOrder(params) {
        return httpService.get(ORDER_URL, { params })
    }
    updateOrder(payload) {
        const { data, id } = payload;
        return httpService.put(`${ORDER_URL}/${id}`, data)
    }
}

export default new OrderService();

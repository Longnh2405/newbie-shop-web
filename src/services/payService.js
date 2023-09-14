import { PAY_URL } from 'constants/api';
import httpService from './httpServices';

class PayService {
    createPay(data) {
        return httpService.post(PAY_URL, data)
    }
}

export default new PayService();

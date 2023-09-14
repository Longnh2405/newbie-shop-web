import { COUNT_NOTI_URL, NOTI_URL } from 'constants/api';
import httpService from './httpServices';

class NotificationServices {
    getCountNoti() {
        return httpService.get(COUNT_NOTI_URL)
    }
    getNoti(params) {
        return httpService.get(NOTI_URL, { params: params })
    }
    readNoti(id) {
        return httpService.patch(`${NOTI_URL}/${id}/read`)
    }
}

export default new NotificationServices();

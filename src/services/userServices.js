import { USER_URL } from 'constants/api';
import httpService from './httpServices';

class UserServices {
    getUserDetail(params) {
        return httpService.get(`${USER_URL}/detail`)
    }
    updateUser(data) {
        return httpService.put(`${USER_URL}/update`, data)
    }
    changePassword(data) {
        return httpService.put(`${USER_URL}/change-password`, data)
    }
}

export default new UserServices();

import { AUTH_CHANGE_PASSWORD, AUTH_LINE, AUTH_PROJECTS_URL, REGISTER_URL } from 'constants/api';
import httpService from './httpServices';

class AuthServices {
    register(data) {
        return httpService.post(REGISTER_URL, data)
    }
}

export default new AuthServices();

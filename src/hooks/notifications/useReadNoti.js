import { useMutation } from 'react-query';
import notificationServices from 'services/notificationServices';

export const useReadNoti = () => {
    return useMutation(notificationServices.readNoti);
};

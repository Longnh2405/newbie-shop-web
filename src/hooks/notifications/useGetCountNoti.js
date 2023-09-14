import { queryKeys } from 'constants/index';
import { useQuery } from 'react-query';
import notificationServices from 'services/notificationServices';

export const useGetCountNoti = (params) => {
    return useQuery([queryKeys.countNoti, params], () => notificationServices.getCountNoti(params));
};

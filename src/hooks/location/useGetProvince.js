import { useQuery } from 'react-query';
import httpServices from 'services/httpServices';

export const useGetProvince = () => {
    return useQuery(['province'], () => httpServices.get('https://provinces.open-api.vn/api/?depth=3'));
};

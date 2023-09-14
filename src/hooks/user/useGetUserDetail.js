import { useQuery } from "react-query";
import userServices from "services/userServices";

export const useGetUserDetail = () => {
    return useQuery(['userDetail'], () => userServices.getUserDetail())
};

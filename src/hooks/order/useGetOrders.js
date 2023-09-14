import { useQuery } from "react-query"
import orderServices from "services/orderServices"

export const useGetOrders = (params) => {
    return useQuery(['getOrders', params], ({ queryKey }) => orderServices.getOrder(queryKey[1]))
}
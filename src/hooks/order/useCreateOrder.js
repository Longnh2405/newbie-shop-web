import { useMutation } from "react-query"
import orderServices from "services/orderServices"

export const useCreateOrder = () => {
    return useMutation(orderServices.addOrder)
}
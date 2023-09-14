import { useMutation } from "react-query"
import orderServices from "services/orderServices"

export const useUpdateOrder = () => {
    return useMutation(orderServices.updateOrder)
}
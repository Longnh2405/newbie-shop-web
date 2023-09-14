import { useMutation } from "react-query"
import payService from "services/payService"

export const useCreatePay = () => {
    return useMutation(payService.createPay)
}
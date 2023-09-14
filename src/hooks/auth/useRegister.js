import { useMutation } from "react-query"
import authServices from "services/authServices"

export const useRegister = () => {
    return useMutation(authServices.register)
}
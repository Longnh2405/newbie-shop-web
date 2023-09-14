import { useMutation } from "react-query"
import userServices from "services/userServices"

export const useChangePassword = () => {
    return useMutation(userServices.changePassword)
}
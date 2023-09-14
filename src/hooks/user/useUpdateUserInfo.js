import { useMutation } from "react-query"
import userServices from "services/userServices"

export const useUpdateUserInfo = () => {
    return useMutation(userServices.updateUser)
}
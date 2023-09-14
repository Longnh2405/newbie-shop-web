import { useMutation } from "react-query"
import uploadService from "services/uploadService"

export const useUploadFiles = () => {
    return useMutation(uploadService.uploadFiles)
}
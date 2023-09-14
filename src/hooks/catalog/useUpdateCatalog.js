import { useMutation } from "react-query"
import catalogService from "services/catalogService"

export const useUpdateCatalog = () => {
    return useMutation(catalogService.updateCatalog)
}
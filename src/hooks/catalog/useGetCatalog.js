import { useQuery } from "react-query"
import catalogService from "services/catalogService"

export const useGetCatalog = (params) => {
    return useQuery(['getCatalog'], () => catalogService.getCatalog(params))
}
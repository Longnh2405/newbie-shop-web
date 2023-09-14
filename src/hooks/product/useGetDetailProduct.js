import { useQuery } from "react-query"
import productService from "services/productService"

export const useGetDetailProduct = (params) => {
    return useQuery(['getDetailProduct', params], ({ queryKey }) => productService.getDetailProduct(queryKey[1]))
}
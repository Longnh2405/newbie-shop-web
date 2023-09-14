import { useQuery } from "react-query"
import productService from "services/productService"

export const useGetProducts = (params) => {
    return useQuery(['getProducts', params], ({ queryKey }) => productService.getProduct(queryKey[1]))
}
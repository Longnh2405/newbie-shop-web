import { useMutation } from "react-query"
import productService from "services/productService"
export const useDeleteProduct = () => {
    return useMutation(productService.deleteProduct)
}
import { useMutation } from "react-query"
import productService from "services/productService"

export const useUpdateProduct = () => {
    return useMutation(productService.updateProduct)
}
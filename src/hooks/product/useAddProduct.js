import { useMutation } from "react-query"
import productService from "services/productService"

export const useAddProduct = () => {
    return useMutation(productService.addProduct)
}
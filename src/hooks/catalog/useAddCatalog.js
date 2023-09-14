import { useMutation } from "react-query";
import catalogService from "services/catalogService";

export const useAddCatalog = () => {
    return useMutation(catalogService.addCatalog);
};

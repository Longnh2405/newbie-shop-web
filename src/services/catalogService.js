import { CATALOG_MANAGE_URL } from 'constants/api';
import httpService from './httpServices';

class CatalogService {
  getCatalog(params) {
    return httpService.get(CATALOG_MANAGE_URL, { params });
  }
  addCatalog(data) {
    return httpService.post(CATALOG_MANAGE_URL, data)
  }
  updateCatalog(payload) {
    const { data, id } = payload;
    return httpService.put(`${CATALOG_MANAGE_URL}/${id}`, data)
  }
}

export default new CatalogService();

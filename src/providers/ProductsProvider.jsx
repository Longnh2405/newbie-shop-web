import { RouteBase } from 'constants/routeUrl';
import { useGetCatalog } from 'hooks/catalog/useGetCatalog';
import { useGetProducts } from 'hooks/product/useGetProducts';
import { useEffect, useState } from 'react';
import { createContext, useContext, useMemo } from 'react';
import React from 'react';
import { useLocation } from 'react-router-dom';

const ProductsContext = createContext({});

export const useProducts = () => useContext(ProductsContext);

const ProductsProvider = ({ children }) => {
  const location = useLocation();
  const [searchText, setSearchText] = useState('');

  const { data: resProducts, refetch } = useGetProducts({
    page: 1,
    limit: 1000,
    search: searchText,
    catalog_id: '',
    color_id: '',
    size_id: '',
  });
  const listProduct = resProducts?.data?.data || [];

  const { data: resListCatalog } = useGetCatalog({
    page: 1,
    limit: 1000,
    search: '',
  });
  const listCategory = resListCatalog?.data?.data || [];

  const value = useMemo(() => {
    return { listProduct, listCategory, setSearchText, searchText };
  }, [listProduct, listCategory, setSearchText, searchText]);

  useEffect(() => {
    if (location.pathname !== RouteBase.Catalog) setSearchText('');
  }, [location.pathname]);

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};

export default ProductsProvider;

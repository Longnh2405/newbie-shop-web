import React, { useCallback, useState, useEffect, useRef } from 'react';

import { Button, Pagination } from '@mui/material';

import { BiX } from 'react-icons/bi';
import { SwipeableDrawer } from '@mui/material';
import CheckboxUser from 'components/CommonStyles/CheckBoxUser';
import InfinityList from 'components/InfinityList/InfinityList';
import productData from 'assets/fake-data/products';
import colors from 'assets/fake-data/product-colors';
import sizes from 'assets/fake-data/product-size';
import category from 'assets/fake-data/category';
import { useProducts } from 'providers/ProductsProvider';
import { COLORS } from 'constants';
import { SIZES } from 'constants';
import { useGetProducts } from 'hooks/product/useGetProducts';

const Catalog = () => {
  const { searchText } = useProducts();
  const initFilter = {
    page: 1,
    limit: 500,
    search: searchText,
    catalog_id: [],
    color_id: [],
    size_id: [],
  };
  const [filter, setFilter] = useState(initFilter);
  const { data: resProducts, refetch } = useGetProducts(filter);
  const products = resProducts?.data?.data || [];

  const { listCategory } = useProducts();

  const [drawer, setDrawer] = useState(false);

  const clearFilter = () => setFilter(initFilter);

  const filterSelect = (type, checked, item) => {
    if (checked) {
      switch (type) {
        case 'CATEGORY':
          setFilter({ ...filter, catalog_id: [...filter.catalog_id, item.id] });
          break;
        case 'COLOR':
          setFilter({ ...filter, color_id: [...filter.color_id, item.value] });
          break;
        case 'SIZE':
          setFilter({ ...filter, size_id: [...filter.size_id, item.value] });
          break;
        default:
      }
    } else {
      switch (type) {
        case 'CATEGORY':
          const newCategory = filter.catalog_id.filter((e) => e !== item.id);
          setFilter({ ...filter, catalog_id: newCategory });
          break;
        case 'COLOR':
          const newColor = filter.color_id.filter((e) => e !== item.value);
          setFilter({ ...filter, color_id: newColor });
          break;
        case 'SIZE':
          const newSize = filter.size_id.filter((e) => e !== item.value);
          setFilter({ ...filter, size_id: newSize });
          break;
        default:
      }
    }
  };

  // const updateProducts = () => {
  //   let temp = listProduct;

  //   if (filter.category.length > 0) {
  //     temp = temp.filter((e) => filter.category.includes(e.catalog_id));
  //   }
  //   if (filter.color.length > 0) {
  //     temp = temp.filter((e) => {
  //       const check = e.product_detail.find((item) => filter.color.includes(item.color_id));
  //       return check !== undefined;
  //     });
  //   }

  //   if (filter.size.length > 0) {
  //     temp = temp.filter((e) => {
  //       const check = e.product_detail.find((item) => filter.size.includes(item.size_id));
  //       return check !== undefined;
  //     });
  //   }
  //   setProducts(temp);
  // };

  // useEffect(() => {
  //   updateProducts();
  // }, [filter]);

  // useEffect(() => {
  //   setProducts(listProduct);
  // }, [listProduct]);

  const filterRef = useRef(null);

  const showHideFilter = () => {
    filterRef.current.classList.toggle('active');
    setDrawer(!drawer);
  };

  return (
    <div className="catalog container">
      <div className="catalog__filter" ref={filterRef}>
        <i className="catalog__filter__exit" onClick={showHideFilter}>
          <BiX></BiX>
        </i>
        <div className="catalog__filter__widget">
          <div className="catalog__filter__widget__title">Danh mục sản phẩm</div>
          <div className="catalog__filter__widget__content">
            {listCategory.map((item, index) => (
              <div key={index} className="catalog__filter__widget__content__item">
                <CheckboxUser
                  onChange={(input) => filterSelect('CATEGORY', input.checked, item)}
                  label={item.name}
                  checked={filter.catalog_id.includes(item.id)}
                ></CheckboxUser>
              </div>
            ))}
          </div>
        </div>
        <div className="catalog__filter__widget">
          <div className="catalog__filter__widget__title">Màu sắc</div>
          <div className="catalog__filter__widget__content">
            {COLORS.map((item, index) => (
              <div key={index} className="catalog__filter__widget__content__item">
                <CheckboxUser
                  onChange={(input) => filterSelect('COLOR', input.checked, item)}
                  label={item.label}
                  checked={filter.color_id.includes(item.value)}
                ></CheckboxUser>
              </div>
            ))}
          </div>
        </div>
        <div className="catalog__filter__widget">
          <div className="catalog__filter__widget__title">Kích cỡ</div>
          <div className="catalog__filter__widget__content">
            {SIZES.map((item, index) => (
              <div key={index} className="catalog__filter__widget__content__item">
                <CheckboxUser
                  onChange={(input) => filterSelect('SIZE', input.checked, item)}
                  label={item.label}
                  checked={filter.size_id.includes(item.value)}
                ></CheckboxUser>
              </div>
            ))}
          </div>
        </div>
        <div className="catalog__filter__widget">
          <div className="catalog__filter__widget__content">
            <Button variant="contained" size="large" onClick={clearFilter}>
              Xóa bộ lọc
            </Button>
          </div>
        </div>
      </div>
      <div className="catalog__toggle">
        <Button variant="contained" size="large" onClick={showHideFilter}>
          Filter
          <SwipeableDrawer
            open={drawer}
            onClose={() => setDrawer(false)}
            onOpen={() => setDrawer(true)}
          ></SwipeableDrawer>
        </Button>
      </div>

      <div className="catalog__content">
        <InfinityList data={products}></InfinityList>
        {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination count={10} variant="outlined" shape="rounded" />
        </div> */}
      </div>
    </div>
  );
};

export default Catalog;

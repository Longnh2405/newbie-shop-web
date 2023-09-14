import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import Section, { SectionBody, SectionTitle } from 'components/Section/Section';
import Grid from 'components/Grid/Grid';
import ProductCard from 'components/Product/ProductCard';
import ProductView from 'components/Product/ProductView';
import productData from 'assets/fake-data/products';
import { useParams } from 'react-router-dom';
import { useProducts } from 'providers/ProductsProvider';
import { getProducts } from 'helpers';
import { useGetDetailProduct } from 'hooks/product/useGetDetailProduct';
import { BASE_IMAGE } from 'constants/api';

const useStyles = makeStyles((theme) => {
  return {};
});

const Product = (props) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const { listProduct } = useProducts();

  const { slug } = useParams();
  const { data: resProductDetail, refetch } = useGetDetailProduct(slug);
  const product = resProductDetail?.data?.data || [];

  const relateProducts = getProducts(listProduct, 8);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  //! Function

  //! Render
  return (
    <div className="container">
      <Section>
        <SectionBody>
          <ProductView product={product} />
        </SectionBody>
        <Section>
          <SectionTitle>Khám phá thêm</SectionTitle>
          <SectionBody>
            <Grid col={4} mdCol={2} smCol={1} gap={20}>
              {relateProducts.map((item, index) => (
                <ProductCard
                  key={item.id}
                  img01={`${BASE_IMAGE}${item?.image_with_product?.[0].image.url}`}
                  img02={`${BASE_IMAGE}${item?.image_with_product?.[1].image.url}`}
                  name={item?.name}
                  price={item?.price}
                  slug={item?.id}
                  discount={item.discount}
                ></ProductCard>
              ))}
            </Grid>
          </SectionBody>
        </Section>
      </Section>
    </div>
  );
};

export default Product;

import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import Section, { SectionBody, SectionTitle } from 'components/Section/Section';
import { Link } from 'react-router-dom';
import PolicyCard from 'components/PolicyCard/PolicyCard';
import { MdLocalShipping, MdCreditCard } from 'react-icons/md';
import { RiVipCrownFill } from 'react-icons/ri';
import { AiOutlineFileProtect } from 'react-icons/ai';
import Grid from 'components/Grid/Grid';
import SliderProduct from 'components/Product/SliderProduct';
import ProductCard from 'components/Product/ProductCard';
import productData from 'assets/fake-data/products';
import banner from 'assets/images/banner.png';
import banner1 from 'assets/images/longNHbanner.png';
import { useProducts } from 'providers/ProductsProvider';
import { getProducts } from 'helpers';
import { BASE_IMAGE } from 'constants/api';

const useStyles = makeStyles((theme) => {
  return {
    wrapperBanner: {
      width: '100%',
      '& .imgBanner': {
        width: '100%',
      },
    },
  };
});

const Home = (props) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const { listProduct } = useProducts();

  const policy = [
    {
      name: 'Miễn phí giao hàng',
      description: 'Miễn phí ship với đơn hàng > 239K',
      icon: <MdLocalShipping></MdLocalShipping>,
    },
    {
      name: 'Thanh toán COD',
      description: 'Thanh toán khi nhận hàng (COD)',
      icon: <MdCreditCard></MdCreditCard>,
    },
    {
      name: 'Khách hàng VIP',
      description: 'Ưu đãi dành cho khách hàng VIP',
      icon: <RiVipCrownFill></RiVipCrownFill>,
    },
    {
      name: 'Hỗ trợ bảo hành',
      description: 'Đổi, sửa đồ tại tất cả store',
      icon: <AiOutlineFileProtect></AiOutlineFileProtect>,
    },
  ];

  //! Function

  //! Render
  return (
    <div>
      <div className={classes.wrapperBanner}>
        <img className="imgBanner" src={banner1} alt="" />
      </div>
      <div className="container">
        <Section>
          <SectionBody>
            <Grid col={4} mdCol={2} smCol={1} gap={20}>
              {policy.map((item, index) => (
                // <Link to="/policy" key={index}>
                <div key={index}>
                  <PolicyCard name={item.name} description={item.description} icon={item.icon}></PolicyCard>
                </div>
                // </Link>
              ))}
            </Grid>
          </SectionBody>
        </Section>

        <Section>
          <SectionTitle>Top sản phẩm bán chạy trong tuần</SectionTitle>
          <SectionBody>
            <SliderProduct></SliderProduct>
          </SectionBody>
        </Section>

        <Section>
          <SectionTitle>Sản phẩm mới</SectionTitle>
          <SectionBody>
            <Grid col={4} mdCol={2} smCol={1} gap={20}>
              {getProducts(listProduct, 4).map((item, index) => (
                <ProductCard
                  key={item.id}
                  img01={`${BASE_IMAGE}${item.image_with_product[0].image.url}`}
                  img02={`${BASE_IMAGE}${item.image_with_product[1].image.url}`}
                  name={item.name}
                  price={item.price}
                  discount={item.discount}
                  slug={item.id}
                ></ProductCard>
              ))}
            </Grid>
          </SectionBody>
        </Section>

        <div>
          <img style={{ width: '100%' }} src={banner} alt="" />
        </div>

        <Section>
          <SectionTitle>Phổ biến</SectionTitle>
          <SectionBody>
            <Grid col={4} mdCol={2} smCol={1} gap={20}>
              {getProducts(listProduct, 8).map((item, index) => (
                <ProductCard
                  key={item.id}
                  img01={`${BASE_IMAGE}${item.image_with_product[0].image.url}`}
                  img02={`${BASE_IMAGE}${item.image_with_product[1].image.url}`}
                  name={item.name}
                  price={item.price}
                  discount={item.discount}
                  slug={item.id}
                ></ProductCard>
              ))}
            </Grid>
          </SectionBody>
        </Section>
      </div>
    </div>
  );
};

export default Home;

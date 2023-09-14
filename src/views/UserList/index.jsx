import React, { Fragment, useMemo } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Box } from '@mui/system';
import { Form, Formik, Field } from 'formik';
import { InputAdornment, Tooltip } from '@mui/material';
import SelectField from 'components/CustomField/SelectField';
import Sort from 'assets/IconsSVG/UserList/Sort.svg';
import useFilters from 'hooks/useFilters';
import CellActions from './Cells/CellActions';
import InputField from 'components/CustomField/InputField';
import useToggleDialog from 'hooks/useToggleDialog';
import DialogAddUser from './Dialog/DialogAddUser';
import { BASE_IMAGE } from 'constants/api';
import { useGetProducts } from 'hooks/product/useGetProducts';
import { useGetCatalog } from 'hooks/catalog/useGetCatalog';

const useStyles = makeStyles((theme) => {
  return {
    userlist_header: {
      width: '100%',
      height: '56px',
      display: 'flex',
      gap: '12px',
      '& .search_container': {
        width: '50%',
        backgroundColor: theme.custom.colors.white,
        borderRadius: '12px',
        [theme.breakpoints.down('md')]: {
          width: '90%',
        },
        '& .search_box': {
          width: '100%',
          '& input': {
            height: '32px',
          },
        },
      },
      '& .select_container': {
        borderRadius: '12px',
        backgroundColor: theme.custom.colors.white,
        border: 'solid 1px #C6CCD3',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        '& div': {
          '&:nth-child(2)': {
            [theme.breakpoints.down('md')]: {
              display: 'none',
            },
          },
        },
        '& .select_icon': {
          width: '24px',
          height: '24px',
          background: `url(${Sort}) no-repeat center center`,
          backgroundSize: 'cover',
          marginRight: '12px',
        },
        '& .select_box': {
          '& fieldset': {
            border: 0,
          },
          '& div': {
            color: '#434D56',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
          },
        },
      },
    },
    user_code: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'baseline',
      '& .branchBox': {
        display: 'flex',
        maxWidth: '150px',
        flexWrap: 'wrap',
        gap: '5px',
        marginTop: '10px',
      },
    },
    department: {
      padding: '0 8px',
      backgroundColor: '#EBF2FE',
      borderRadius: 4,
    },
    staffCode: {
      color: '#6E7282',
    },
    username: {
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
      justifyContent: 'left',
    },
    avatar: {
      width: '26px',
      height: '26px',
      borderRadius: '50%',
      backgroundColor: '#fdd145',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    name: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#434E74',
      lineheight: '14px',
    },
    actionGroup: {
      display: 'flex',
      gap: '10px',
    },
    sortBy: {
      [theme.breakpoints.down('lg')]: {
        display: 'none',
      },
    },
    btnFilter: {
      width: '12%',
      '& button': {
        width: '100%',
        padding: '15px 24px',
      },
    },
    CellItemNote: {
      maxWidth: '180px',
      minWidth: '180px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  };
});

const initialFilters = {
  page: 1,
  limit: 10,
  search: '',
  catalog_id: '',
  color_id: '',
  size_id: '',
};

const UserList = (props) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  const { open: openAddUser, toggle: toggleAddUser, shouldRender: shouldRenderAddUser } = useToggleDialog();
  const { filters, handleChangePage, handleSelect, handleSelectAll, handleRequestSort, handleSearch } =
    useFilters(initialFilters);
  const { data: resProducts, refetch } = useGetProducts(filters);
  const data = resProducts?.data?.data || [];
  const paging = resProducts?.data?.paging;
  const maxPage = Math.ceil(paging?.total / paging?.limit) || 1;

  const { data: resListCatalog } = useGetCatalog({
    page: 1,
    limit: 1000,
    search: '',
  });
  const listCatalog = resListCatalog?.data?.data || [];
  const catalogOption = listCatalog.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const columns = [
    { label: 'Mã sản phẩm', id: 'id' },
    { label: 'Tên sản phẩm', id: 'name' },
    { label: 'Giá thành', id: 'price' },
    {
      label: 'Phân loại',
      id: 'catalog',
      Cell: (row) => {
        return <div>{row.catalog.name}</div>;
      },
    },
    {
      label: 'Ảnh',
      id: 'img',
      Cell: (row) => {
        return (
          <div style={{ display: 'flex', gap: '6px', height: '100px', width: '240px', justifyContent: 'center' }}>
            {row?.image_with_product?.map((item, index) => {
              if (index < 2) return <img key={item?.id} src={`${BASE_IMAGE}${item?.image?.url}`} alt="abc" />;
              return null;
            })}
          </div>
        );
      },
    },
    {
      label: 'Mô tả',
      id: 'description',
      Cell: (row) => {
        return (
          <Tooltip title={row?.description || ''}>
            <div className={classes.CellItemNote}>{row?.description ? row?.description : '_'}</div>
          </Tooltip>
        );
      },
    },
    {
      label: '',
      id: 'table_action',
      Cell: (row) => {
        return <CellActions item={row} refetch={refetch} />;
      },
    },
  ];

  //! Function

  //! Render
  return (
    <Fragment>
      <Formik
        initialValues={{
          search: '',
          catalog_id: '',
        }}
        onSubmit={(values) => {
          handleSearch('search')(values.search);
          handleSearch('catalog_id')(values.catalog_id);
        }}
      >
        {(props) => {
          console.log('props.values: ', props.values);
          return (
            <Form style={{ marginBottom: '50px' }}>
              <Box mb="23px" className={classes.userlist_header}>
                <CommonStyles.Button
                  sx={{ flex: 1, overflow: 'hidden' }}
                  color="primary"
                  startIcon={<CommonIcons.Add />}
                  onClick={toggleAddUser}
                >
                  Thêm sản phẩm mới
                </CommonStyles.Button>
                <div>
                  <div>
                    {shouldRenderAddUser && (
                      <DialogAddUser
                        open={openAddUser}
                        toggle={toggleAddUser}
                        // isLoading={isAddingUser || isEditingUser}
                        refetch={refetch}
                      />
                    )}
                  </div>
                </div>
                <Box className="search_container">
                  <Field
                    component={InputField}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CommonIcons.Search />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Tìm kiếm"
                    sx={{ height: '100%' }}
                    className="search_box"
                    name="search"
                  />
                </Box>

                <Box className="select_container">
                  <Box>
                    <Box className="select_icon"></Box>
                  </Box>
                  <Box className={classes.sortBy}>Danh mục sản phẩm</Box>
                  <Box>
                    <Field
                      component={SelectField}
                      options={catalogOption}
                      className="select_box"
                      name="catalog_id"
                      // value={props.values.catalog_id}
                      afterOnChange={(e) => handleSearch('catalog_id')(e.target.value)}
                    />
                  </Box>
                </Box>
                <Box className={classes.btnFilter}>
                  <CommonStyles.Button type="submit">{t('common:search')}</CommonStyles.Button>
                </Box>
              </Box>
            </Form>
          );
        }}
      </Formik>
      <CommonStyles.Content>
        <CommonStyles.Table
          filters={filters}
          data={data}
          columns={columns}
          total={paging?.total}
          handleChangePage={handleChangePage}
          maxPage={maxPage}
          currentPage={filters.page}
        />
      </CommonStyles.Content>
      {/* <CommonStyles.Button type="submit" sx={{ display: 'none' }} /> */}
    </Fragment>
  );
};

export default UserList;

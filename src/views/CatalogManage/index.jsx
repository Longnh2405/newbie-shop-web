import React, { useMemo } from 'react';
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
import InputField from 'components/CustomField/InputField';
import useToggleDialog from 'hooks/useToggleDialog';
import { useGetCatalog } from 'hooks/catalog/useGetCatalog';
import DialogAddCatalog from './Dialog/DialogAddCatalog';
import CellActions from './Action/CellActions';

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
  };
});

const initialFilters = {
  page: 1,
  limit: 5,
  search: '',
};

const CatalogManage = (props) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const { open: openAddCatalog, toggle: toggleAddCatalog, shouldRender: shouldRenderAddCatalog } = useToggleDialog();
  const { filters, handleChangePage, handleSelect, handleSelectAll, handleRequestSort, handleSearch } =
    useFilters(initialFilters);
  const { data: resListCatalog, refetch } = useGetCatalog(filters);
  const listCatalog = resListCatalog?.data?.data || [];
  const paging = resListCatalog?.data?.paging;
  const maxPage = Math.ceil(paging?.total / paging?.limit) || 1;

  const columns = [
    {
      label: 'Mã phân loại',
      id: 'id',
    },
    { label: 'Tên phân loại', id: 'name' },

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
    <Formik
      initialValues={{
        searchValue: '',
        sort: 'desc',
      }}
      onSubmit={(values) => {
        handleSearch('search')(values.searchValue);
      }}
    >
      {(props) => {
        return (
          <Form style={{ marginBottom: '50px' }}>
            <Box mb="23px" className={classes.userlist_header}>
              <CommonStyles.Button
                sx={{ flex: 1, overflow: 'hidden' }}
                color="primary"
                startIcon={<CommonIcons.Add />}
                onClick={toggleAddCatalog}
              >
                Thêm phân loại sản phẩm
              </CommonStyles.Button>
              <div>
                <div>
                  {shouldRenderAddCatalog && (
                    <DialogAddCatalog open={openAddCatalog} toggle={toggleAddCatalog} refetch={refetch} />
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
                  name="searchValue"
                />
              </Box>
              <Box className={classes.btnFilter}>
                <CommonStyles.Button type="submit">{t('common:search')}</CommonStyles.Button>
              </Box>
              {/* <Box className="select_container">
                <Box>
                  <Box className="select_icon"></Box>
                </Box>
                <Box className={classes.sortBy}>{t('common:sort_by')}</Box>
                <Box>
                  <Field
                    component={SelectField}
                    options={[
                      { value: 'fullname:ASC', label: 'Tên sản phẩm' },
                      { value: 'staffCode:ASC', label: 'Mã sản phẩm' },
                      { value: 'userTitle:ASC', label: 'Giá từ thấp đến cao' },
                      { value: 'userRole:ASC', label: 'Giá từ cao xuống thấp' },
                    ]}
                    className="select_box"
                    name="sort"
                    value={props.values.sort}
                    afterOnChange={(e) => handleRequestSort('sort')(e.target.value)}
                  />
                </Box>
              </Box> */}
            </Box>
            <CommonStyles.Content>
              <CommonStyles.Table
                filters={filters}
                data={listCatalog}
                total={paging?.total}
                handleChangePage={handleChangePage}
                maxPage={maxPage}
                columns={columns}
                currentPage={filters.page}
              />
            </CommonStyles.Content>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CatalogManage;

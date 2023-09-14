import React from 'react';
import PropTypes from 'prop-types';
import CommonStyles from 'components/CommonStyles';
import { Fragment } from 'react';
// import { columns } from './columns';
import useFilters from 'hooks/useFilters';
import FormSearch from './formSearch';
import HeadLabel from './Head/HeadLabel';
import CellItem from './Cells/CellItem';
import CellActions from 'views/UserList/Cells/CellActions';
import CustomField from 'components/CustomField';
import { useGetOrders } from 'hooks/order/useGetOrders';
import { useUpdateOrder } from 'hooks/order/useUpdateOrder';
import { showError, showSuccess } from 'helpers/toast';

const propTypes = {};

const initialFilters = {
  page: 1,
  limit: 1000,
  search: '',
};

const Permission = (props) => {
  //! State

  const optionStatus = [
    { value: 1, label: 'Đã xác nhận' },
    { value: 2, label: 'Chưa xác nhận' },
    { value: 3, label: 'Đang giao' },
    { value: 4, label: 'Đã giao' },
  ];
  const optionTransaction = [
    { value: 2, label: 'Đã thanh toán' },
    { value: 1, label: 'Chưa thanh toán' },
  ];
  const {
    filters,
    setFilters,
    rowsSelected,
    setRowsSelected,
    handleChangePage,
    handleSelect,
    handleSelectAll,
    handleSearch,
  } = useFilters(initialFilters);

  const { data: resData, refetch } = useGetOrders(filters);
  const data = resData?.data?.data || [];
  const paging = resData?.data?.paging;
  const maxPage = Math.ceil(paging?.total / paging?.limit) || 1;
  const { mutateAsync: updateOrder } = useUpdateOrder();

  const handleUpdateOrder = async (id, value) => {
    try {
      await updateOrder({ id: id, data: value });
      refetch();
      showSuccess('Cập nhật thành công');
    } catch (error) {
      console.log('error: ', error);
      showError('Có lỗi xảy ra');
    }
  };

  const columns = [
    {
      label: 'Mã đơn hàng',
      id: 'code',
      Cell: (row) => {
        return <div>{row?.id}</div>;
      },
    },
    {
      label: 'Tên khách hàng',
      id: 'name',
      Cell: (row) => {
        return <div>{row?.user?.name}</div>;
      },
    },
    {
      label: <HeadLabel label="Số điện thoại" />,
      id: 'phoneNumber',
      Cell: (row) => <CellItem data={row?.user?.phone} />,
    },
    {
      label: 'Mã sản phẩm',
      id: 'codeProduct',
      Cell: (row) => {
        return (
          <div style={{ display: 'flex', gap: '8px' }}>
            {row?.order_detail?.map((item, index) => (
              <div key={index}>{item.product_detail_id}</div>
            ))}
          </div>
        );
      },
    },
    {
      label: 'Tổng tiền',
      id: 'post_promotion_payment_total',
    },
    {
      label: 'Địa chỉ',
      id: 'rank',
      Cell: (row) => {
        return <div>{row?.user?.address}</div>;
      },
    },
    {
      label: 'Trạng thái',
      id: 'status',
      Cell: (row) => {
        return (
          <CommonStyles.SelectInput
            value={row?.status}
            options={optionStatus}
            onChange={(e) => handleUpdateOrder(row.id, { status: e.target.value })}
          />
        );
      },
    },
    {
      label: 'Thanh toán',
      id: 'transaction',
      Cell: (row) => {
        return (
          <CommonStyles.SelectInput
            value={row?.payment_status}
            options={optionTransaction}
            onChange={(e) => handleUpdateOrder(row.id, { payment_status: e.target.value })}
          />
        );
      },
    },
    // {
    //   label: '',
    //   id: 'table_action',
    //   Cell: (row) => {
    //     return <CellActions user={row} />;
    //   },
    // },
  ];

  //! Function

  //! Render
  return (
    <Fragment>
      <FormSearch handleSearch={handleSearch} />
      <CommonStyles.Content>
        <CommonStyles.Table
          filters={filters}
          data={data}
          total={paging?.total}
          columns={columns}
          handleChangePage={handleChangePage}
          maxPage={maxPage}
          currentPage={filters.page}
        />
      </CommonStyles.Content>
    </Fragment>
  );
};

Permission.propTypes = propTypes;
export default Permission;

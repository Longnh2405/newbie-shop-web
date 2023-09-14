import { React } from 'react';
import CellCode from './Cells/CellCode';
import CellItem from './Cells/CellItem';
import CellName from './Cells/CellName';
import CellRank from './Cells/CellRank';
import HeadLabel from './Head/HeadLabel';
import { Box } from '@mui/system';
import CellItemNote from './Cells/CellItemNote';

const customHead = (staffCode, department) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'baseline' }}>
      <Box>{staffCode}</Box>
      <Box>{department}</Box>
    </Box>
  );
};

export const columns = [
  {
    label: 'Mã đơn hàng',
    id: 'code',
  },
  {
    label: 'Tên khách hàng',
    id: 'name',
  },
  {
    label: <HeadLabel label="Số điện thoại" />,
    id: 'phoneNumber',
    Cell: (row) => <CellItem data={row.phoneNumber} />,
  },
  {
    label: 'Sản phẩm',
    id: 'email',
  },
  {
    label: 'Tổng tiền',
    id: 'price',
  },
  {
    label: 'Địa chỉ',
    id: 'rank',
  },
];

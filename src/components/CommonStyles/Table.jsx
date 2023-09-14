import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@mui/styles';
import CommonStyles from '.';
import Empty from 'assets/IconsSVG/UserList/Empty.svg';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { cloneDeep, isArray, isEmpty } from 'lodash';
import { useEffect } from 'react';
import SimpleBarReact from 'simplebar-react';

const useStyleHead = makeStyles((theme) => ({
  head_cell: {
    textAlign: 'center !important',
    color: `${theme.custom.colors.lightblue} !important`,
    fontSize: '14px !important',
    lineHeight: '24px !important',
    fontWeight: '600 !important',
    padding: '20px  !important',
  },
}));

const EnhancedTableHead = (props) => {
  //! State
  const classes = useStyleHead();
  const { onSelectAllClick, selected, data, headCells, hasCheckbox, noCheckboxHead, limit, isLoading, countSticky } =
    props;
  //! Function
  const numSelected = selected.reduce((returnArr, currentVal) => {
    if (data.includes(currentVal)) returnArr.push(currentVal);
    return returnArr;
  }, []).length;

  //! Render
  return (
    <TableHead>
      <TableRow>
        {hasCheckbox && !noCheckboxHead && (
          <TableCell padding="checkbox" sx={{ paddingLeft: '10px' }}>
            <CommonStyles.Checkbox
              remove={numSelected !== limit}
              onClick={onSelectAllClick}
              checked={numSelected > 0}
            />
          </TableCell>
        )}
        {!!hasCheckbox && noCheckboxHead && <TableCell></TableCell>}
        {headCells?.map((headCell, index) => (
          <TableCell
            key={index}
            className={`${classes.head_cell}  ${index < countSticky ? 'sticky' : null}`}
            style={index < countSticky ? { position: 'sticky', backgroundColor: '#fff', zIndex: 99 } : null}
            padding="none"
          >
            {headCell?.label_custom ? headCell?.label_custom() : headCell?.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  onSelectAllClick: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
  Pagination: {
    padding: 15,
    display: 'flex',
    justifyContent: 'center',
    width: 'fit-content',
    '& ul': {
      '& li': {
        '& .MuiPaginationItem-root': {
          backgroundColor: theme.custom.colors.lightgrey,
        },
        '& .Mui-selected': {
          backgroundColor: theme.custom.colors.lightblue,
          '&:hover': {
            backgroundColor: theme.custom.colors.lightblue,
          },
        },
      },
    },
  },
  table_cell: {
    border: '0',
    padding: '20px  !important',
  },
  table_row_isHotNumber: {
    border: '2px solid red',
  },

  total: {
    position: 'absolute',
    bottom: '24px',
    left: '16px',
    color: theme.custom.colors.darkgray,
  },
  table_comment: {
    position: 'absolute',
    width: '17px',
    height: '17px',
    borderRadius: '50%',
    backgroundColor: theme.custom.colors.red,
    left: 0,
    color: theme.custom.colors.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 'calc(50% - 8.5px)',
  },
  table_footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  table_total: {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: '500',
    color: '#22262B',
  },
  emptyTable: {
    width: '100%',
    height: '400px',
    backgroundImage: `url(${Empty})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '15%',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: '20px',
  },
  loading: {
    width: '70px !important',
    height: '70px !important',
  },
  loadingContainer: {
    marginTop: 50,
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  TableContainer: {
    // minHeight: '555px',
    overflow: 'unset !important',
    maxWidth: '100%',
    '& .MuiTableRow-root.MuiTableRow-hover': {
      '&:hover': {
        backgroundColor: '#e0e0e0',
        '& .MuiTableCell-root.MuiTableCell-body': {
          backgroundColor: '#e0e0e0 !important',
        },
      },
    },
  },
}));

const EnhancedTable = ({
  columns = [],
  data = [],
  maxPage,
  hasCheckbox,
  noCheckboxHead,
  handleChangePage,
  handleSelect,
  handleSelectAll,
  handleSelectOne,
  filters,
  total,
  rowTotal,
  rowsSelected,
  maxHeight,
  sxCell,
  isLoading,
  countSticky,
  currentPage,
}) => {
  //! State
  const classes = useStyles();
  const [selected, setSelected] = React.useState([]);
  const { t } = useTranslation();

  const { page, limit } = filters;
  const rowPerPage = limit || 10;

  //! Function
  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleClickRow = (row) => {
    if (handleSelectOne) {
      const newSelected = cloneDeep(selected);
      if (newSelected.includes(row?.id)) {
        setSelected([]);
        handleSelectOne([]);
      } else {
        handleSelectOne(row);
        setSelected([row?.id]);
      }
      return;
    }
    const id = row?.id;
    handleSelect(row);
    const index = selected.indexOf(id);
    if (index === -1) setSelected([...selected, id]);
    else {
      const newSelected = [...selected];
      newSelected.splice(index, 1);
      setSelected(newSelected);
    }
  };

  const handleSelectAllClick = () => {
    if (selected.length > 0) {
      setSelected([]);
      handleSelectAll([]);
    } else {
      handleSelectAll(data);
      setSelected(data.map((n) => n.id));
    }
  };

  useEffect(() => {
    if (rowsSelected) {
      const rowSelect = rowsSelected.reduce((returnArr, currentValue) => {
        returnArr.push(currentValue?._id);
        return returnArr;
      }, []);
      rowsSelected && setSelected(rowSelect);
    }
  }, [rowsSelected]);

  useEffect(() => {
    if (!isLoading && countSticky) {
      const interval = setInterval(() => {
        const sticky = document.getElementsByClassName('sticky');

        try {
          if (sticky) {
            let width = 0;
            let count = 0;
            for (let i = 0; i < sticky.length; i++) {
              sticky[i].style.left = `${width}px`;
              width += sticky[i].offsetWidth;
              count++;
              if (count === countSticky) {
                width = 0;
                count = 0;
              }
            }
            clearInterval(interval);
          }
        } catch (error) {
          console.log('erro', error);
        }
      }, 1000);
    }
  }, [isLoading]);

  //! Render
  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <SimpleBarReact style={{ maxWidth: '100%', maxHeight: maxHeight }}>
        <TableContainer className={data.length > 0 ? classes.TableContainer : ''}>
          <Table sx={{ minWidth: 750 }} size="medium">
            <EnhancedTableHead
              selected={selected}
              onSelectAllClick={handleSelectAllClick}
              headCells={columns}
              hasCheckbox={hasCheckbox}
              noCheckboxHead={noCheckboxHead}
              limit={data.length}
              data={data}
              isLoading={isLoading}
              countSticky={countSticky}
            />
            <TableBody>
              {data?.map((row, index) => {
                const isItemSelected = isSelected(row?.id);
                return (
                  <TableRow
                    hover
                    roll="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    selected={isItemSelected}
                    className={row?.isBorder ? classes.table_row_isHotNumber : null}
                  >
                    {hasCheckbox && (
                      <TableCell padding="checkbox" sx={{ paddingLeft: '10px' }} onClick={() => handleClickRow(row)}>
                        <CommonStyles.Checkbox checked={isItemSelected} />
                      </TableCell>
                    )}
                    {columns.map((column, index) => {
                      return (
                        <TableCell
                          component={column?.component || 'th'}
                          id={index}
                          scope="row"
                          key={index}
                          align="center"
                          padding="normal"
                          // className={classes.table_cell}
                          className={`${classes.table_cell}  ${index < countSticky ? 'sticky' : null}`}
                          style={
                            index < countSticky
                              ? { position: 'sticky', backgroundColor: '#fff', zIndex: '999', width: '200px' }
                              : null
                          }
                          sx={{ ...(sxCell || {}), position: 'relative' }}
                        >
                          {index === 0 && row.comment && <div className={classes.table_comment}>!</div>}
                          {column?.Cell ? column?.Cell(row) : row[column.id]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
              {rowTotal ? rowTotal : ''}
            </TableBody>
          </Table>
        </TableContainer>
      </SimpleBarReact>
      {data.length === 0 && !isLoading && (
        <Box className={classes.emptyTable}>
          <CommonStyles.Typography variant="h2" component="h2">
            Không có dữ liệu
          </CommonStyles.Typography>
        </Box>
      )}

      {isLoading && (
        <Box className={classes.loadingContainer}>
          <CircularProgress className={classes.loading} />
        </Box>
      )}

      <Box className={classes.table_footer}>
        <Box className={classes.table_total}>Tổng data: {total}</Box>
        <Pagination
          className={classes.Pagination}
          color="primary"
          count={maxPage}
          shape="rounded"
          siblingCount={1}
          boundaryCount={1}
          onChange={handleChangePage}
          page={currentPage}
        />
      </Box>
    </Box>
  );
};

export default EnhancedTable;

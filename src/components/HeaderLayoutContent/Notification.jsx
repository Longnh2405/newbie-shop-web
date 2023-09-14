import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Box, Divider, List, ListItemButton, ListItemText } from '@mui/material';
import { useGetNoti, useGetNotiInfinity } from 'hooks/notifications/useGetNoti';
import moment from 'moment';
import SimpleBarReact from 'simplebar-react';
import { useReadNoti } from 'hooks/notifications/useReadNoti';
import { useQueryClient } from 'react-query';
import { queryKeys } from 'constants/index';
import useToggleDialog from 'hooks/useToggleDialog';
// import ContentModal from 'views/Contacts/Modal/ModalEdit/ContentModal';
import { useGetDetailDataLeads } from 'hooks/leads/useGetDetailDataLeads';
import { flattenDeep } from 'lodash';

const useStyles = makeStyles((theme) => {
  return {
    header: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      paddingLeft: 16,
      height: 40,
      fontWeight: 600,
    },
    icon: {
      fontSize: '0.8rem !important',
      color: theme.custom.colors.blue,
    },
    loadMore: {
      display: 'flex',
      justifyContent: 'center',
      fontSize: 14,
      padding: '0 0 5px 0',
      fontWeight: 600,
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.custom.colors.gray,
      },
    },
  };
});

const Notification = ({ countNotiUnRead }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  // const notiList = notiData?.data?.data?.data || [];
  // const paging = notiData?.data?.data?.paging;
  const [filterPage, setFilterPage] = useState({ page: 1, limit: 5 });
  const { isLoading: readingNoti, mutateAsync: readNoti } = useReadNoti();
  const [idLeads, setIdLeads] = useState();
  const { data: dataLeads, refetchDataLeads } = useGetDetailDataLeads(idLeads, { enabled: !!idLeads });
  const dataDetailContact = dataLeads?.data?.data;
  const { open: openDialog, toggle: toggleDialog, shouldRender: shouldRenderDialog } = useToggleDialog();

  const {
    data: dataGetNoti,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    remove,
    refetch: refetchNotiList,
  } = useGetNotiInfinity(filterPage);

  //! Function
  const convertTime = (time) => {
    return moment(time).fromNow();
  };

  const onLoadMore = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage || isLoading) {
      return;
    }
    const nextPage = (filterPage?.page || 0) + 1;
    setFilterPage((prev) => {
      return {
        ...prev,
        page: nextPage,
      };
    });
    fetchNextPage({ pageParam: nextPage });
  }, [
    filterPage?.page,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    // handleFilters,
    fetchNextPage,
  ]);

  const flatAllPages = (data) => {
    //! Use for infiniteQuery
    let dataFlat = [];
    if (data) {
      if (data.pages) {
        dataFlat = flattenDeep(data.pages.map((el) => el.data)).filter((el) => !!el);
      }
    }
    const notiList = [];
    dataFlat.forEach((item) => {
      item.data.forEach((i) => notiList.push(i));
    });
    return notiList;
  };

  const notificatonList = flatAllPages(dataGetNoti);

  const handleReadNoti = async (item) => {
    try {
      await readNoti(item?.id);
      await queryClient.refetchQueries([queryKeys.countNoti]);
      // await queryClient.refetchQueries([queryKeys.notis]);
      setIdLeads(item?.data.lead);
      toggleDialog();
      refetchNotiList();
    } catch (error) {
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    //* Clear cache data
    return () => {
      remove();
    };
  }, [remove]);

  //! Render
  return (
    <Fragment>
      <SimpleBarReact style={{ minWidth: 320, maxWidth: 450, maxHeight: 530 }}>
        <Box>
          <div className={classes.header}>Thông báo</div>
          <Divider />
          <List component="nav" aria-label="secondary mailbox folder">
            {notificatonList.map((item) => (
              <ListItemButton
                key={item?.id}
                onClick={() => {
                  handleReadNoti(item);
                }}
              >
                <ListItemText
                  sx={{ overflowWrap: 'break-word' }}
                  primary={item?.content}
                  secondary={convertTime(item?.createdAt)}
                />
                {!item?.isRead && <CommonIcons.DotIcon className={classes.icon} />}
              </ListItemButton>
            ))}
            {notificatonList.length === 0 && (
              <ListItemButton>
                <ListItemText primary={t('common:no_noti')} />
              </ListItemButton>
            )}
          </List>
          {hasNextPage && (
            <>
              <Divider />
              <div className={classes.loadMore} onClick={() => onLoadMore()}>
                {t('common:see_more')}
              </div>
            </>
          )}
        </Box>
      </SimpleBarReact>
      {/* {shouldRenderDialog && (
        <CommonStyles.Modal
          open={openDialog}
          toggle={toggleDialog}
          content={<ContentModal item={dataDetailContact} toggle={toggleDialog} />}
        />
      )} */}
    </Fragment>
  );
};

export default Notification;

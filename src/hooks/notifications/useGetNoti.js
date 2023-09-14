import { queryKeys } from 'constants/index';
import { isArray } from 'lodash';
import { useInfiniteQuery, useQuery } from 'react-query';
import notificationServices from 'services/notificationServices';

export const checkLastPage = (lastPage, filters) => {
    if (isArray(lastPage?.data?.data) && lastPage?.data?.data.length <= 0) {
        return undefined;
    }

    if (lastPage?.data?.paging?.totalPage <= (filters?.page || 1)) {
        return undefined;
    }

    return filters.page;
};


// export const useGetNoti = (params) => {
//     return useQuery([queryKeys.notis, params], (params) => notificationServices.getNoti(params));
// };

export const useGetNotiInfinity = (filters) => {
    return useInfiniteQuery(
        queryKeys.notis,
        async ({ pageParam = 1 }) => {
            const response = await notificationServices.getNoti({
                ...filters,
                page: pageParam,
            });
            return response.data;
        },
        {
            getNextPageParam: (lastPage) => {
                return checkLastPage(lastPage, filters)
            },
            onError: (error) => {
                console.log('error: ', error)
            },
        }
    );
};

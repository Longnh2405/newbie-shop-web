import usersServices from 'services/usersServices';
import Timer from 'helpers/timer';
import { isEmpty } from 'lodash';

const timerDebounce = new Timer();
export const loadOptionsLineAsync = (valueInput, roleOption, { setOptions, setLoading }, value, valueProject) => {
    try {
        setLoading(true);
        timerDebounce.debounce(async () => {
            const body = {
                limit: 20,
                page: 1,
                sort: 'createdAt:DESC',
                searchText: valueInput,
                userRoleKey: roleOption,
                project: valueProject
            };
            const response = await usersServices.getUserOptions(body);
            const options = response?.data?.data?.data.filter((item) => {
                const index = value?.findIndex((elm) => elm?.value === item?.value)
                return index === -1
            }) || []
            setOptions(options)
            setLoading(false);
        }, 400);

    } catch (error) {
        alert(error.toString());
    }
};

export const loadOptionsAsyncFilter = (valueInput, roleOption, { setOptions, setLoading }, value, valueProject) => {
    const valueCheck = value?.filter(item => item.value === 'EMPTY')
    const isValueEmpty = isEmpty(valueCheck)
    try {
        setLoading(true);
        timerDebounce.debounce(async () => {
            const body = {
                limit: 20,
                page: 1,
                sort: 'createdAt:DESC',
                searchText: valueInput,
                userRoleKey: roleOption,
                project: valueProject
            };
            const response = await usersServices.getUserOptions(body);
            const responseConvert = response?.data?.data?.data
            const optionConvert = [{ label: 'Không có', value: 'EMPTY' }].concat(responseConvert)

            const options = isValueEmpty ?
                (isEmpty(value) ? optionConvert : responseConvert).filter((item) => {
                    const index = value?.findIndex((elm) => elm?.value === item?.value)
                    return index === -1
                })
                : []
            setOptions(options)
            setLoading(false);
        }, 400);

    } catch (error) {
        alert(error.toString());
    }
};


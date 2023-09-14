import { queryKeys } from 'constants';
import { useQuery } from 'react-query';
import todosServices from 'services/todosServices';

export const useGetListTodos = () => {
  return useQuery([queryKeys.todos], () => todosServices.getTodos());
};

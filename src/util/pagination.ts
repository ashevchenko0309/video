import { PaginationOptions } from '../types/pagination.types';

const getPaginationOptions = (startFrom: string, toEnd: string): PaginationOptions | Error => {
  const start = parseFloat(startFrom);
  const end = parseFloat(toEnd);
  if (start < 0 || end < start || (start === 0 && end === 0)) {
    return new Error('invalid pagi options');
  }
  return {
    limit: end - start,
    offset: start,
  };
};

export default getPaginationOptions;

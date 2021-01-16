import { PaginationOptions } from "../types/pagination.types"

const getPaginationOptions = (
  startFrom: string,
  toEnd: string,
): PaginationOptions | null => {
  const start = +startFrom;
  const end = +toEnd;

  if (start < 0 || end < start || (start === 0 && end === 0)) {
    return null;
  }

  return {
    limit: end - start,
    offset: start,
  };
};

export default getPaginationOptions;

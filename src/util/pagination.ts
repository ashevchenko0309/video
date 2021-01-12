import { PaginationOptions } from '../types/pagination.types';

export const getPaginationOptions = (start: string, end: string): PaginationOptions | Error => {
  const _start = parseFloat(start);
  const _end = parseFloat(end);
  if (_start < 0 || _end < _start || _start === 0 && _end === 0) {
    return new Error('invalid pagi options');
  }
  return {
    limit: _end - _start,
    offset: _start
  };
}
import { $post } from '../utils/request';
import { CHECK_SEARCH_RULE, BOOK_DETAIL, BOOK_SEARCH, ISBN_SEARCH } from './api';
interface response {
  errNo: number;
  errstr: string;
  data: { [key: string]: unknown };
}

export const getCodeSearchList = async function(
  params: { [index: string]: string | number | Blob } | undefined
): Promise<response | undefined> {
  return await $post(ISBN_SEARCH, { ...params, source: 'web' });
};

export const getTextSearchList = async function(
  params: { [index: string]: string | number | Blob } | undefined
): Promise<response | undefined> {
  return await $post(BOOK_SEARCH, { ...params, source: 'web' });
};

export const getBookDetail = async function(
  params: { [index: string]: string | number | Blob } | undefined
): Promise<response | undefined> {
  return await $post(BOOK_DETAIL, { ...params, source: 'web' });
};

export const checkSearchRule = async function(
  params: { [index: string]: string | number | Blob } | undefined
): Promise<response | undefined> {
  return await $post(CHECK_SEARCH_RULE, { ...params, source: 'web' });
};

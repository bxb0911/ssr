/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCodeSearchList, getTextSearchList, getBookDetail, checkSearchRule } from '@/api';

export default {
  async FETCH_CODESEARCH_DATA(
    { commit }: { [x: string]: any },
    params: { [index: string]: string | number | Blob } | undefined
  ): Promise<void> {
    debugger;
    const res = await getCodeSearchList(params);
    commit('SET_BOOKLIST_DATA', res?.data || {});
  },
  async FETCH_TEXTSEARCH_DATA(
    { commit }: { [x: string]: any },
    params: { [index: string]: string | number | Blob } | undefined
  ): Promise<void> {
    const res = await getTextSearchList(params);
    commit('SET_BOOKLIST_DATA', res?.data || {});
  },
  async FETCH_BOOKDETAIL_DATA(
    { commit }: { [x: string]: any },
    params: { [index: string]: string | number | Blob } | undefined
  ): Promise<void> {
    const res = await getBookDetail(params);
    commit('SET_BOOKDETAIL_DATA', res?.data || {});
  },
  async CHECK_SEARCH_RULE(
    { commit }: { [x: string]: any },
    params: { [index: string]: string | number | Blob } | undefined
  ): Promise<void> {
    const res = await checkSearchRule(params);
    commit('SET_SEARCH_STATUS', res?.data || {});
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
  SET_BOOKLIST_DATA: (state: { list: any }, data: { [x: string]: any }): void => {
    state.list = data;
  },
  SET_BOOKDETAIL_DATA: (state: { detail: { [x: string]: any } }, data: { [x: string]: any }): void => {
    state.detail = data;
  },
  SET_SEARCH_STATUS: (state: { isSupport: any }, { isSupport }: { [x: string]: any }): void => {
    state.isSupport = isSupport;
  }
};

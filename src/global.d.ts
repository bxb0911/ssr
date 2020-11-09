import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    logger: any;
    $store: any;
  }

  interface VueConstructor {
    logger: any;
    $store: any;
  }
}
declare global {
  const VConsole: any;
  interface Document {
    documentMode?: any;
  }

  interface Window {
    logger_pageStartTime: number;
    __INITIAL_STATE__: any;
  }
}

declare module '*.less';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module 'nut';

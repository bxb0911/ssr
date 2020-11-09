const ua = navigator.userAgent;
const browser = {
  chrome: function(): number | undefined {
    return /\b(?:Chrome|CriOS)\/(\d+)/i.test(ua) ? +RegExp.$1 : undefined;
  },
  firefox: function(): number | undefined {
    return /\bFirefox\/(\d+)/i.test(ua) ? +RegExp.$1 : undefined;
  },
  safari: function(): number | undefined {
    return /\bSafari\/?(\d+)?/i.test(ua) && !/chrome/i.test(ua) ? +(RegExp.$1 || RegExp.$2) : undefined;
  },
  isStandard: function(): boolean {
    return document.compatMode === 'CSS1Compat';
  },
  isGecko: function(): boolean {
    return /gecko/i.test(ua) && !/like gecko/i.test(ua);
  },
  isWebkit: function(): boolean {
    return /webkit/i.test(ua);
  },
  os: function(): string {
    let os = 'other';
    if (/\bMac/i.test(ua)) {
      if (/iPhone/i.test(ua)) {
        os = 'iphone os_' + (/iPhone OS (\d+(?:_\d+)?)/i.test(ua) ? RegExp.$1.replace('_', '.') : 'unknown');
      } else if (/iPad/i.test(ua)) {
        os = 'ipad os_' + (/iPad.*OS (\d+(?:_\d+)?)/i.test(ua) ? RegExp.$1.replace('_', '.') : 'unknown');
      } else {
        os = 'mac os_' + (/Mac OS X (\d+(?:_\d+)?)/i.test(ua) ? RegExp.$1.replace('_', '.') : 'unknown');
      }
    } else if (/Android/i.test(ua)) {
      os = 'android os_' + (/Android (\d+(?:\.\d+)?)/i.test(ua) ? RegExp.$1 : 'unknown');
    } else if (/\bWindows/i.test(ua)) {
      os =
        'windows os_' +
        (/Windows NT (\d+)/i.test(ua) ? RegExp.$1 : 'unknown') +
        '_' +
        (/win64|x64|wow64/i.test(ua) ? '64' : '32') +
        'bit';
    }
    return os;
  },
  kernel: function(): string {
    let browser = 'other';
    if (this.chrome()) {
      browser = 'chrome_' + this.chrome();
    } else if (this.safari()) {
      browser = 'safari_' + this.safari();
    } else if (this.firefox()) {
      browser = 'firefox_' + this.firefox();
    }
    return browser;
  }
};

export default browser;

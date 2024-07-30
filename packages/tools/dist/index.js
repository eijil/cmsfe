// src/report/index.ts
import { nanoid } from "nanoid";
import pako from "pako";

// src/env.ts
import { UAParser } from "ua-parser-js";
var getEnv = (userAgent) => {
  userAgent = userAgent ? userAgent : typeof window !== "undefined" ? window.navigator.userAgent : "";
  const uaParser = UAParser(userAgent);
  const { device, ua, os } = uaParser;
  return {
    uaParser,
    isMobile: device.type === "mobile",
    isFB: isFB(ua),
    isAndroid: os.name === "Android",
    isIOS: os.name === "iOS",
    isTablet: device.type === "tablet",
    isMac: os.name === "Mac OS"
  };
};
var isFB = (ua) => {
  return /FBAN|FBAV|FB_IAB|FB_IABV_SIMULATOR/.test(ua);
};

// src/report/index.ts
import { Buffer } from "buffer";
var env = getEnv();
var reported = {};
var ReportSDK = class _ReportSDK {
  VERSION;
  APP_ID;
  CHANNEL_ID;
  PACKAGE_NAME;
  REPORT_API;
  static instance;
  constructor(params) {
    this.REPORT_API = params.reportAPI;
    this.VERSION = params.version;
    this.APP_ID = params.appId;
    this.CHANNEL_ID = params.channelId;
    this.PACKAGE_NAME = params.packageName || "h5";
  }
  static getInstance(params) {
    if (!_ReportSDK.instance) {
      _ReportSDK.instance = new _ReportSDK(params);
    }
    return _ReportSDK.instance;
  }
  /**
   * 通用上报
   * @param param
   */
  eventReport({ event_name, sub_event_name, properties, ctime }, key) {
    if (key && reported[key]) {
      return;
    }
    const data = {
      _event_name: event_name,
      _sub_event_name: sub_event_name,
      properties
    };
    try {
      this.reportHandle(data, ctime);
    } catch (e) {
      console.log("\u4E0A\u62A5\u5931\u8D25", e);
    }
    if (key) {
      reported[key] = true;
    }
  }
  /**
   * 加载页面上报
   * @param {string} pageName 当前路由名
   * @param {string} prePageName 前路由名
   * @param {string} url 页面路径
   * @param {string} _scene_name 场景
   */
  pageEnter(params) {
    this.reportHandle({
      _event_name: "m_page_enter",
      properties: {
        ...params,
        _referrer_url: document == null ? void 0 : document.referrer
      }
    });
  }
  /**
   * 应用安装激活
   */
  installReport() {
    const { uaParser } = env;
    let category = "";
    if (env.isMobile) {
      category = "phone";
    } else if (env.isTablet) {
      category = "tablet";
    } else if (env.isMac) {
      category = "mac";
    } else {
      category = "pc";
    }
    if (!localStorage.getItem("_app_install_id")) {
      this.reportHandle({
        _event_name: "m_app_install",
        properties: {
          _device_brand: "",
          // 拿不到就是空
          _device_model: "",
          // 拿不到就是空
          _device_screen_h: window.screen.height,
          _device_screen_w: window.screen.width,
          _device_ram: 0,
          // 拿不到就是空
          _device_lang: "en",
          _device_category: category,
          //设备类型 phone/tablet/pc/mac/
          browser_brand: uaParser.browser.name,
          browser_version: uaParser.browser.version,
          _ua: navigator.userAgent,
          _url: window.location.href,
          _referrer_url: document == null ? void 0 : document.referrer
        }
      });
    }
  }
  getBaseInfo() {
    const { uaParser } = env;
    const _os_type = uaParser.os.name ? uaParser.os.name.toLowerCase() : "";
    const baseInfo = {
      _app_id: this.APP_ID,
      _app_channel_id: this.CHANNEL_ID,
      _app_version: this.VERSION,
      _package_name: this.PACKAGE_NAME,
      _app_game_version: "",
      // 传空
      _app_res_version: "",
      // 传空
      _app_install_id: localStorage.getItem("_app_install_id") || "",
      // install_id
      _app_activate_id: sessionStorage.getItem("_app_activate_id") || "",
      // 3.5 run_id
      _device_id: "",
      // 传空
      _ad_id: "",
      // 传空
      _androidid: "",
      // 传空
      _idfv: "",
      // 传空
      _os_type,
      // 获取平台id
      _os_version: "",
      // 有就报，没有就报空
      _os_timezone_offset: `utc_offset=-8:00`,
      _os_timestamp: Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3),
      // 3.5 ctime
      _device_network_type: 0,
      _app_user_id: localStorage.getItem("uid") || "",
      // uuid
      // @ts-ignore
      _app_lang: (navigator == null ? void 0 : navigator.language) || (navigator == null ? void 0 : navigator.userLanguage) || "",
      // 浏览器语言
      _event_name: "",
      // 之前的eid,A列的事件名称
      _sub_event_name: "",
      // 子事件名称， 默认传空字符串
      properties: {}
    };
    const h = (/* @__PURE__ */ new Date()).getTimezoneOffset() / 60;
    const m = ((/* @__PURE__ */ new Date()).getTimezoneOffset() % 60).toString().padStart(2, "0");
    baseInfo._os_timezone_offset = `utc_offset=${h}:${m}`;
    if (!localStorage.getItem("_app_install_id")) {
      const _app_install_id = nanoid();
      baseInfo._app_install_id = _app_install_id;
      localStorage.setItem("_app_install_id", _app_install_id.toString());
    }
    if (!sessionStorage.getItem("_app_activate_id")) {
      const _app_activate_id = nanoid();
      baseInfo._app_activate_id = _app_activate_id;
      sessionStorage.setItem("_app_activate_id", _app_activate_id.toString());
    }
    return baseInfo;
  }
  reportHandle(params, ctime) {
    const reportInfo = this.getBaseInfo();
    if (ctime)
      reportInfo._os_timestamp = ctime;
    const data = {
      ...reportInfo,
      ...params
    };
    this.send(data);
  }
  /**
   * 发送数据到服务端
   */
  async send(data) {
    console.log("\u4E0A\u62A5\u4FE1\u606F", data);
    const d = pako.deflate(JSON.stringify([data]));
    const buffer = Buffer.from(d);
    const result = await fetch(this.REPORT_API, {
      method: "POST",
      body: buffer.toString("base64")
    }).catch((err) => {
      console.log("\u4E0A\u62A5\u5931\u8D25", err);
    });
    return result;
  }
};
var report_default = ReportSDK;

// src/webview/type.ts
var IWebView = class {
};

// src/webview/index.ts
var i = 0;
var UID_PREFIX = Date.now().toString();
var WebView = class extends IWebView {
  // 回调函数存储池
  nativeCallback = /* @__PURE__ */ new Map();
  constructor() {
    super();
    if (typeof window === "undefined") {
      return;
    }
    window.nativeCallback = (res) => {
      this.handleCallback(res);
    };
  }
  /** * 直接调用api  */
  exec = (name, params) => {
    return this.addApi(name)[name](params);
  };
  /** 增加一项新的Api */
  addApi = (name) => {
    if (!this[name]) {
      this[name] = (params) => {
        return this.run(name, params);
      };
      console.log(this);
    }
    return this;
  };
  /**
   * 新增回调
   * */
  addCallback = (name, callback) => {
    this.nativeCallback.set(name, callback);
  };
  getTrigger = (name) => {
    return (name || "fn") + `${UID_PREFIX}-${i++}`;
  };
  /** 调用接口 */
  run = (apiName, params = {}) => {
    const { callback, param = [] } = params;
    const _param = param;
    if (typeof callback === "function") {
      const trigger = this.getTrigger(apiName);
      this.addCallback(trigger, callback);
      _param.unshift(["trigger", trigger]);
    }
    console.log(_param);
    this.iosMessage(apiName, _param);
    this.androidMessage(apiName, _param);
    if (window.webkit) {
      this.iosMessage(apiName, _param);
    } else if (window == null ? void 0 : window.Android) {
      this.androidMessage(apiName, _param);
    } else {
    }
    return false;
  };
  /** IOS通信 */
  iosMessage = (apiName, params = []) => {
    var _a, _b, _c, _d, _e;
    const kit = window.webkit;
    const parma = {};
    params.forEach((item) => {
      parma[item[0]] = item[1];
    });
    console.log("ios", parma);
    if (!((_b = (_a = kit == null ? void 0 : kit.messageHandlers) == null ? void 0 : _a[apiName]) == null ? void 0 : _b.postMessage)) {
    }
    (_e = (_d = (_c = kit == null ? void 0 : kit.messageHandlers) == null ? void 0 : _c[apiName]) == null ? void 0 : _d.postMessage) == null ? void 0 : _e.call(_d, parma);
  };
  /** android通信 */
  androidMessage = (apiName, params) => {
    var _a, _b;
    const isPrama = !!params.length;
    if (isPrama) {
      const para = params.map((item) => {
        const [key, val] = item;
        return val;
      });
      console.log("android", para);
      return (_a = window == null ? void 0 : window.Android) == null ? void 0 : _a[apiName](...para);
    }
    return (_b = window == null ? void 0 : window.Android) == null ? void 0 : _b[apiName]();
  };
  /** 增强回调 */
  handleCallback = (res) => {
    var _a;
    let param = res;
    if (typeof res === "string") {
      try {
        param = JSON.parse(res);
      } catch (error) {
        param = res;
      }
    }
    const { trigger, ...otehr } = param;
    (_a = this.nativeCallback.get(trigger)) == null ? void 0 : _a(otehr);
  };
};
var webview = new WebView();
webview.addCallback("reload", () => window.location.reload());
var webview_default = webview;
export {
  report_default as ReportSDK,
  webview_default as webview
};
//# sourceMappingURL=index.js.map
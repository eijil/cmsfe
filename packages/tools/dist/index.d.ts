interface IParams {
    reportAPI: string;
    version: string;
    appId: string;
    channelId: string;
    packageName?: string;
}
interface IEventReportParam {
    event_name: string;
    sub_event_name: string;
    properties: any;
    ctime?: number;
}

declare class ReportSDK {
    private VERSION;
    private APP_ID;
    private CHANNEL_ID;
    private PACKAGE_NAME;
    private REPORT_API;
    private static instance;
    private constructor();
    static getInstance(params: IParams): ReportSDK;
    /**
     * 通用上报
     * @param param
     */
    eventReport({ event_name, sub_event_name, properties, ctime }: IEventReportParam, key?: string): void;
    /**
     * 加载页面上报
     * @param {string} pageName 当前路由名
     * @param {string} prePageName 前路由名
     * @param {string} url 页面路径
     * @param {string} _scene_name 场景
     */
    pageEnter(params: {
        _page_name: string;
        _pre_page_name: string;
        _url: string;
        project_id?: number;
        project_info?: any;
    }): void;
    /**
     * 应用安装激活
     */
    installReport(): void;
    private getBaseInfo;
    private reportHandle;
    /**
     * 发送数据到服务端
     */
    private send;
}

interface ICallParam {
    closePage: {
        [key: string]: any;
    };
    getUserInfo: {
        [key: string]: any;
    };
    continueWatch: {
        [key: string]: any;
    };
    getPermissionStatus: {
        permission: string[];
    };
    updatePermissionStatus: {
        permission: string;
    };
    jumpPlayer: {
        [key: string]: any;
    };
    /** 跳转一级页面 */
    switchToPrimaryTab: {
        tabName: string;
    };
    /** 跳转二级页面 */
    pushToSecondaryPage: {
        pageName: string;
    };
    /** 跳转播放器 */
    navigateToPlayer: {
        bookId: string;
        bookType: number;
        chapterId: string;
        shelfId: string;
    };
    openInBrowser: {
        url: string;
        isInApp: 1 | 0;
    };
    openSystermRoute: {
        url: string;
    };
    /**
     * 支付
     */
    purchase: {
        /**
         * 1: apple
         * 2: google
         * 3: paypal
         */
        payType: string;
        payParams?: {
            productId?: string;
            gid?: string;
            price?: string;
            orderSrc?: string;
            bookId?: string;
            tBookId?: string;
            source?: string;
        };
    };
    watchAd: {
        eventId: string;
    };
}
interface ICallbackParams {
    getUserInfo: {
        [key: string]: any;
    };
    continueWatch: {
        [key: string]: any;
    };
    getPermissionStatus: {
        result: [
            {
                permission: string;
                status: '1' | '2';
            }
        ];
    };
    openSystermRoute: {
        [key: string]: any;
    };
    jumpPlayer: {
        [key: string]: any;
    };
    navigateToPlayer: {
        [key: string]: any;
    };
    switchToPrimaryTab: {
        [key: string]: any;
    };
    pushToSecondaryPage: {
        pageName: string;
    };
    openInBrowser: {
        [key: string]: any;
    };
    /**
     * 支付
     */
    purchase: {
        status: string;
    };
    watchAd: {
        eventId: string;
    };
    closePage: {
        [key: string]: any;
    };
    updatePermissionStatus: {
        permission: string;
        status: string;
    };
}
type Action = keyof ICallParam;
type CallBack<T extends Action> = (res: CallBackResult<T>) => void;
type ICallBackParam<T extends Action> = {
    callback?: CallBack<T>;
};
type NavtiveCallParam<T extends Action> = ICallParam[T] & ICallBackParam<T>;
type CallBackResult<T extends Action> = {
    code: number;
    name: T;
    message: string;
    id: string;
    data: ICallbackParams[T];
};

declare class WebView {
    private nativeCallbacks;
    constructor();
    private registerCallback;
    /** 执行  */
    exec<T extends Action>(action: T, params?: NavtiveCallParam<T>): {
        id: string;
        name: T;
        params: Omit<NavtiveCallParam<T>, "callback"> | {};
    };
    /** 调用接口 */
    private postMessage;
    /** IOS通信 */
    private iosMessage;
    /** android通信 */
    private androidMessage;
}
declare const _default: WebView;

export { ReportSDK, _default as webview };

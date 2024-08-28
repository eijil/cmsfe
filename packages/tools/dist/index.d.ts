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
        [key: string]: unknown;
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
    /** 跳转一级页面 */
    switchToPrimaryTab: {
        tabName: 'home' | 'forYou' | 'rewards' | 'profile' | 'library';
    };
    /** 跳转二级页面 */
    pushToSecondaryPage: {
        pageName: 'history' | 'myWallet' | 'login' | 'store' | 'rewards' | 'myCoupons';
        [key: string]: unknown;
    };
    /** 跳转播放器 */
    navigateToPlayer: {
        bookId: string;
        bookType?: number;
        chapterId?: string;
        shelfId?: number;
    };
    openInBrowser: {
        url: string;
        isInApp: 1 | 0;
        title: string;
        resourceId: string;
        version?: string;
    };
    openSystemRoute: {
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
        payParams?: Partial<{
            productId: string;
            gid: string;
            price: string;
            orderSrc: string;
            bookId: string;
            tBookId: string;
            source: string;
        }>;
    };
    watchAd: {
        eventId: string;
    };
    floatingBoxAction: {
        action: 'show' | 'close' | 'click';
    };
    reportEvent: {
        eventName: string;
        childEventName: string;
        /**
         * json
         */
        properties: Record<string, unknown>;
    };
    /**
     * h5获取native用户token
     */
    fetchNativeToken: Record<string, unknown>;
    /**
     * h5触发native更新离线包
     */
    checkUpdate: Record<string, unknown>;
}
interface ICallbackParams {
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
    openSystemRoute: {
        [key: string]: any;
    };
    navigateToPlayer: {
        [key: string]: any;
    };
    switchToPrimaryTab: {
        tabName: string;
        [key: string]: unknown;
    };
    pushToSecondaryPage: {
        pageName: string;
        [key: string]: unknown;
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
        needUpdate: string;
    };
    floatingBoxAction: {
        action: string;
    };
    reportEvent: {
        [key: string]: any;
    };
    fetchNativeToken: {
        token: string;
    };
    checkUpdate: Record<string, unknown>;
}
type Action = keyof ICallParam;
type CallBack<T extends Action> = (res: CallBackResult<T>) => void;
type ICallBackParam<T extends Action> = {
    callback?: CallBack<T>;
};
type NativeCallParam<T extends Action> = ICallParam[T] & ICallBackParam<T>;
type CallBackResult<T extends Action> = {
    code: number;
    name: T;
    message: string;
    id: string;
    data: ICallbackParams[T];
};

declare class WebView {
    nativeCallbacks: Map<string, CallBack<any>>;
    constructor();
    private registerCallback;
    /**
     * 初始化回调
     * @param params Record<Action, CallBack<Action>>
     * @returns void
     */
    init<T extends Action>(params: Record<T, CallBack<T>>): void;
    /**
     * 执行
     * @param action 事件名
     * @param params 参数
     * @returns
     */
    exec<T extends Action>(action: T, params?: NativeCallParam<T>): {
        id: string;
        name: T;
        params: Omit<NativeCallParam<T>, "callback"> | {};
    };
    /** 调用接口 */
    private postMessage;
    /**
     * 错误回调
     * @param param
     */
    private errorCallBack;
    /**
     * ios
     * @param param
     */
    private iosMessage;
    /**
     * android
     * @param param
     */
    private androidMessage;
}
declare const _default: WebView;

export { ReportSDK, _default as webview };

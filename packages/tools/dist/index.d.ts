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

type ICallback = (response?: any) => void;
interface WebviewParams {
    callback?: ICallback;
    param?: Array<Array<any>>;
}
declare class IWebView {
    [key: string]: any;
}

declare class WebView extends IWebView {
    private nativeCallback;
    constructor();
    /** * 直接调用api  */
    exec: (name: string, params?: WebviewParams) => any;
    /** 增加一项新的Api */
    addApi: (name: string) => this;
    /**
     * 新增回调
     * */
    addCallback: (name: string | number, callback: ICallback) => void;
    private getTrigger;
    /** 调用接口 */
    private run;
    /** IOS通信 */
    private iosMessage;
    /** android通信 */
    private androidMessage;
    /** 增强回调 */
    private handleCallback;
}
declare const webview: WebView;

export { ReportSDK, webview };

import env from './env.js'
import axios from 'axios'
import router from './router'
import {ElMessage} from 'element-plus'

const common = (app, store) => {

    app.config.globalProperties.test = function () {


        console.log('test')

    }


    app.config.globalProperties.store = function () {


        console.log(store.state.count)

    }


    // app.config.globalProperties.http


    //公共函数
//-----------------------------------------------------------------------------------------------
    /**
     * 判断运行环境
     */
    app.config.globalProperties.isDev = function () {

        if (process.env.NODE_ENV == 'development') return true;

        return false;

    }

    /**
     * 获取api域名
     */
    app.config.globalProperties.getHost = function () {

        // return process.env.HOST;

        // if(app.config.globalProperties.isDev()) return app.config.globalProperties.getEnv('devHost')

        // return app.config.globalProperties.getEnv('proHost');

        return app.config.globalProperties.getEnv('host');

        // if (app.config.globalProperties.isDev()) return 'http://lv.com/api';

    }

    /**
     * 公共请求方法
     * @param {Object} params
     */
    app.config.globalProperties.httpCommon = function (params) {

        params.baseURL = app.config.globalProperties.getHost();

        //是否显示加载遮罩层
        if (params.loading === true) {

            var loadForRequest = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });

        }




        //废弃
        // params.headers = {
        //   'token': app.config.globalProperties.localGet('token'),
        //   // 'rule':Vue.$route.path
        // };

        return new Promise((resolve, reject) => {

            axios(params).then((res) => {

                if (params.loading === true) loadForRequest.close();

                if (res.data.code >= 10 && res.data.code <= 50) {

                    reject(res.data);

                    return router.push('/login');
                }

                if (res.data.code >= 51 && res.data.code <= 100) {

                    this.$notify({
                        title: '错误',
                        message: res.data.msg,
                        position: 'bottom-right',
                        type: 'error'
                    });

                    reject(res.data);

                    return false;
                    // return this.$message.error(res.data.msg);
                }





                // //是否显示错误信息提示，一般返回code为1是成功，其他是失败
                if (!(params.disableError === true)) {

                    if (res.data.code !== 1) {

                        // resolve(res.data);

                        this.$notify({
                            title: '错误',
                            message: res.data.msg,
                            position: 'bottom-right',
                            type: 'error'
                        });


                        reject(res)

                        return

                    }

                }


                resolve(res.data);

            }).catch((err) => {

                reject(err)
            });

        });

    }

    /**
     * get请求，数据用params
     * @param {Object} params
     */
    app.config.globalProperties.httpGet = function (params) {


        params.method = 'get';

        return new Promise((resolve, reject) => {
            app.config.globalProperties.httpCommon(params).then((res) => {

                resolve(res);

            }).catch((res) => {
                reject(res);
            });

        });

    }

    /**
     * post请求，数据用data
     * @param {Object} params
     */
    app.config.globalProperties.httpPost = function (params) {


        params.method = 'post';

        return new Promise((resolve, reject) => {
            app.config.globalProperties.httpCommon(params).then((res) => {

                resolve(res);

            }).catch((res) => {

                reject(res);
            });

        });


    }


    /**
     * 本地储存
     */
    app.config.globalProperties.localSet = function (key, value, prefix = 'super_admin_') {

        localStorage.setItem(prefix + key, value);

    }


    /**
     * 本地储存获取
     */
    app.config.globalProperties.localGet = function (key, defaultValue = '', prefix = 'super_admin_') {

        let re = localStorage.getItem(prefix + key);

        if (!re) return defaultValue;

        return re;

    }

    /**
     * 删除
     */
    app.config.globalProperties.localRemove = function (key, prefix = 'super_admin_') {

        localStorage.removeItem(prefix + key);

    }


    /**
     * 克隆对象
     * @param {Object} object
     */
    app.config.globalProperties.cloneObj = function (object) {

        return JSON.parse(JSON.stringify(object))
    }


    /**
     * item赋值
     * @param {Object} defaultItem
     * @param {Object} item
     */
    app.config.globalProperties.setItem = function (defaultItem, item) {

        // console.log(item);
        for (let key in defaultItem) {

            // console.log(item[key]);

            // console.log(typeof(item[key]));
            if (!(typeof (item[key]) == 'undefined')) {

                // console.log(item[key]);
                defaultItem[key] = item[key];
            }

        }
    }


    app.config.globalProperties.messageCommon = function (title, message, type) {

        return new Promise((success, fail) => {

            this.$confirm(message, title, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: type
            }).then(() => {

                success();
            }).catch(() => {
                // console.log('fail');
                fail();
            });

        });

    }


    app.config.globalProperties.messageSuccess = function (title, message) {


        return new Promise((success, fail) => {

            app.config.globalProperties.messageCommon(title, message, 'success').then(() => {

                success();

            }).catch(() => {

                fail();

            });

        });


    }


    /**
     * 搜索跳转
     *
     * @param context  上下文对象（this）
     * @param query    传递参数
     * @param rememberQuery 是否保存其他参数
     */
    app.config.globalProperties.routerSearch = function (context, query, rememberQuery = true) {

        // let c = app.config.globalProperties.$AppContext;

        let path = context.$route.path;


        let pathTemp = context.cloneObj(path);
        //
        let temp = context.$route.query;


        // let queryTemp = app.config.globalProperties.cloneObj(temp);

        let oldQuery = app.config.globalProperties.cloneObj(temp);


        let str = '?';


        for (let key in query) {

            if (key == 'random') continue;

            let item = query[key];

            // oldQuery[key] = item;

            str += key + '=' + item + '&';


        }


        if (rememberQuery) {

            /**
             * 记住原有参数
             * @param {Object} let key in temp
             */
            for (let key in temp) {

                if (key == 'random') continue;

                if (findIndex(query, key)) continue;

                let item = temp[key];

                oldQuery[key] = item;

                str += key + '=' + item + '&';

            }

        }

        str = str.substr(0, str.length - 1);

        str = str + '&random=' + Math.random();

        console.log(path + str)


        context.$AppContext.$router.push(pathTemp + str).then(() => {

            context.$AppContext.reload()
        })


    }


    function findIndex(array, index) {


        for (let key in array) {

            if (key == index) return true;


        }

        return false;

    }

    /**
     * 弹窗+ajax请求
     *
     * @param title 弹窗标题
     * @param message 弹窗内容
     * @param url 请求地址
     * @param data 请求数据
     *
     */
    app.config.globalProperties.msgBoxAjax = function (title, message, url, data = {}, customClass = 'custom-class') {

        return new Promise((success, fail) => {

            let i = this.$msgbox({
                title: title,
                customClass: customClass,
                message: message,
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                // distinguishCancelAndClose:true
                closeOnClickModal: false,
                closeOnPressEscape: false,
                // closeOnHashChange: false,
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {

                        console.log(instance);
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = '执行中...';

                        app.config.globalProperties.httpPost({
                            url: url,
                            data: data
                        }).then((re) => {
                            // console.log(re);
                            done();

                            instance.confirmButtonLoading = false;


                            i.responseData = re;

                            if (re.code !== 1) {

                                ElMessage.error({
                                    message: re.msg,
                                    duration: 5000
                                });

                            }


                        }).catch(() => {
                            instance.confirmButtonLoading = false;
                            done();
                        });


                    } else {
                        done();
                    }
                }
            }).then((action, instance, done) => {

                if (action == 'confirm') {

                    success(i.responseData);
                } else {


                }

            }).catch(() => {


                fail();

            });


        });


    }


    /**
     * 弹窗+ajax请求+自动显示错误弹窗
     *
     * @param title 弹窗标题
     * @param message 弹窗内容
     * @param url 请求地址
     * @param data 请求数据
     *
     */
    app.config.globalProperties.msgBoxAjaxWithMessage = function (title, message, url, data = {}, customClass = 'custom-class') {

        return new Promise((success, fail) => {

            let i = this.$msgbox({
                title: title,
                customClass: customClass,
                message: message,
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                // distinguishCancelAndClose:true
                closeOnClickModal: false,
                closeOnPressEscape: false,
                // closeOnHashChange: false,
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {

                        console.log(instance);
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = '执行中...';

                        this.httpPost({
                            url: url,
                            data: data,
                            showMessage: true
                        }).then((re) => {
                            // console.log(re);
                            done();

                            instance.confirmButtonLoading = false;


                            i.responseData = re;


                        }).catch(() => {
                            instance.confirmButtonLoading = false;
                            done();
                        });


                    } else {
                        done();
                    }
                }
            }).then((action, instance, done) => {

                if (action == 'confirm') {

                    success(i.responseData);
                } else {


                }

            }).catch(() => {


                fail();

            });


        });


    }


    app.config.globalProperties.getEnv = function (key) {

        if (app.config.globalProperties.isDev()) return env['dev'][key];

        return env['pro'][key];
    }

    /**
     * 获取图片域名
     */
    app.config.globalProperties.getImagePath = function (path) {

        return app.config.globalProperties.getEnv('imgHost') + '/'+path;
    }

    /**
     * 重置对象
     * @param {Object} obj
     */
    app.config.globalProperties.resetObj = function (obj) {

        for (let i in obj) {

            switch (typeof obj[i]) {

                case 'number':

                    obj[i] = 0;

                    break;

                case 'string':

                    obj[i] = '';

                    break;

                case 'object':


                    // obj[i]=[];

                    if (obj[i] instanceof Array) {

                        obj[i] = [];

                        break;
                    }

                    if (obj[i] instanceof Object) {

                        obj[i] = {};

                        break;
                    }

                    obj[i] = '';


                    break;

                default:


                    obj[i] = '';


            }

        }
    }


    app.config.globalProperties.uploadFile = function (event, params = {}) {


        return new Promise((success, fail) => {

            let file = event.target.files;

            let form = new FormData();

            // form.append('file', file);

            //一个文件就是一个表单对象
            for (let i in file) {

                form.append('file' + i, file[i]);
            }

            //额外参数
            for (let i in params) {

                form.append(i, params[i]);

            }


            app.config.globalProperties.httpPost({
                url: "/admin/upload/upload",
                data: form
            }).then((re) => {


                if (re.code == 1) {

                    success(re);
                } else {

                    fail(re);
                }


            });

        });


    }


    app.config.globalProperties.getObj = function (obj, attr, defaultValue = '') {


        try {

            return eval('obj' + '.' + attr);

        } catch (e) {

            return defaultValue;
        }


    }


}


export default common
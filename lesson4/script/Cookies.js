class Cookies {
    static checkRedirectCookies(cookies, page, redirect) {
        if (document.cookie.indexOf(cookies) == -1 && !redirect) {
            window.location.replace(page);
        }
        if (document.cookie.indexOf(cookies) != -1 && redirect) {
            window.location.replace(page);
        }
    }
    static addCookies(key, value, time) {
        document.cookie = key + "=" + value + "; max-age=" + time * 60 * 60;
    }
    static delCookies(key, page) {
        window.location.replace(page);
        document.cookie = key + "=" + "";
    }
    static checkCookies(key, value) {
        if (document.cookie.indexOf(key + "=" + value)!=1){
            return true;
        }else{
            return false;
        }
    }
    static getCookie(key){
        let str = document.cookie;
        const regex = new RegExp( key + "=([a-zA-Z0-9]{1,});?");
        console.log(regex.exec(str));
        return regex.exec(str)[1];
    }
}
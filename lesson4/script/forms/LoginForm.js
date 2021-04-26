class LoginForm extends Form {
    constructor(name, opened = true) {
        super(name, opened);
    }
    submit() {
        let body = new FormData(this.form);
        RequestMaker.makeRequest(this.form.method, this.form.action, true, body)
            .then((resultObj) => {
                Cookies.addCookies("auth", "true", 1);
                Cookies.addCookies("role", resultObj.role, 1);
                Cookies.addCookies("login", resultObj.login, 1);
                window.location.replace("content.html");
            })
            .catch((error) => {
                console.log(error.status);
                switch (error.status) {                    
                    default:
                        this.screenError.showScreenError(error.message);
                        break;
                }
            })
    }
}
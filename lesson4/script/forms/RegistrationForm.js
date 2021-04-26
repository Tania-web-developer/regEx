class RegistrationForm extends Form {
    constructor(name, opened = true) {
        super(name, opened);
        this.matchPasswordValidity();
    }

    submit() {
        let body = new FormData(this.form);
        RequestMaker.makeRequest(this.form.method, this.form.action, true, body)
            .then((answerObj) => {
                Cookies.addCookies("auth", "true", 1);
                Cookies.addCookies("role", answerObj.role, 1);
                Cookies.addCookies("login", answerObj.login, 1);
                window.location.replace("content.html");

            })
            .catch((error) => {
                switch (error.status) {                    
                    default:
                        this.screenError.showScreenError(error.message);
                        break;
                }
            })
    }

    matchPasswordValidity() {
        let pass = this.form.password;
        let checkPass = this.form.check_password;
        let divError = document.querySelector("#check_password_error");
        checkPass.oninput = () => {
            if (pass.value != checkPass.value) {
                this.showError(divError, checkPass);
            } else {
                this.hideError(divError, checkPass);
            }
            this.checkForm();
        }

    }

}
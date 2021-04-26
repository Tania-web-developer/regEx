class LoginRegistration {
    static Init(element) {
        this.element = element;
        this.modalRegistration = element.querySelector("#modal_registration_back");
        this.modalLogin = element.querySelector("#modal_login_back");
        this.registrationBtn = element.querySelector("#registration");
        this.loginBtn = element.querySelector("#login");
        this.loginBtn.onclick = () => {
            LoginRegistration.switchModalState();
        };
        this.registrationBtn.onclick = () => {
            LoginRegistration.switchModalState();
        };
        this.loginForm = new LoginForm("form_login", true);
        this.registrationForm = new RegistrationForm("form_registration", false);
    }
    static switchModalState() {
        this.modalLogin.classList.toggle("modal_open");
        this.modalRegistration.classList.toggle("modal_open");
        this.loginForm.opened =! this.loginForm.opened;
        this.registrationForm.opened =! this.registrationForm.opened;
    }

}
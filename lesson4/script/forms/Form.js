class Form {
    constructor(name, opened = true) {
        this.form = document.forms[name];
        this.opened = opened;
        this.inputs = this.form.querySelectorAll('.validated');
        this.loginInput = this.form.login;
        this.submiBtn = this.form.submit_btn;
        this.screenError = new ScreenError();
        this.submiBtn.onclick = () => {
            this.submit();
        }
        // document.onkeydown = (e) => {
        //     console.log(this.opened);
        //     if (e.key == "Enter" && this.opened) {
        //         console.log("!");
        //         this.submit();
        //     }
        // }

        document.addEventListener("keydown", (e)=>{
            console.log(this.opened);
            if (e.key == "Enter" && this.opened) {
                console.log("!");
                this.submit();
            }
        })

        this.inputs.forEach((input) => {
            let divError = this.form.querySelector("#" + input.name + "_error");//document
            input.oninput = () => {
                if (!input.validity.valid) {
                    this.showError(divError, input)
                } else {
                    this.hideError(divError, input);
                }
                this.checkForm();
            }

        })
    }
    submit() {        
    }
    showError(divError, input) {        
        input.classList.add("error");
        divError.classList.remove("msg_error_hide");    
        divError.classList.add("msg_error_show");
    }
    hideError(divError, input) {
        input.classList.remove("error");
        divError.classList.remove("msg_error_show"); 
        divError.classList.add("msg_error_hide");    
    }
    checkForm() {
        let b = this.form.checkValidity();
        console.log(b);

        this.submiBtn.disabled = !b; // obratnoe ot b
        if (!b) {
            this.submiBtn.classList.add("no-active");
        } else {
            this.submiBtn.classList.remove("no-active");
        }
    }
    
};



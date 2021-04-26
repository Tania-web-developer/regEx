class AdminForm extends Form {
    constructor(name, opened = true) {
        super(name, opened);
        this.error;

    }
    submit() {
        let body = new FormData(this.form);
        RequestMaker.makeRequest(this.form.method, this.form.action, true, body)
            .then((answerObj) => {
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
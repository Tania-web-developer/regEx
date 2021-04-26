class ScreenError {
    constructor() {
        this._screenError = document.querySelector(".modal_screen_error_back");
        this._btnClose = this._screenError.querySelector(".close_error_screen");
        this._h1Msg = this._screenError.querySelector("h1");
        this._btnClose.onclick = () => {
            this.hideScreenError();
        }
    }
    showScreenError(errorMsg) {
        if(this._checkErrorMessage(errorMsg)){
            this._h1Msg.innerHTML = errorMsg;
            this._screenError.classList.remove("hide_screen_error");
            this._screenError.classList.add("show_screen_error");
        }        
    }
    hideScreenError() {
        this._screenError.classList.remove("show_screen_error");
        this._screenError.classList.add("hide_screen_error");
    }
    _checkErrorMessage(errorMsg) {
        if (errorMsg === "") {
            return false;
        } else return true;
    }
}
class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this._status = status;
    }
    get status() {
        return this._status;
    }
}
class RequestMaker {
    static makeRequest(method, link, isForm, body = "") {
        return new Promise((resolve, reject) => {
            let connect = new XMLHttpRequest();
            connect.open(method, link, true);
            if (!isForm && body != "") {
                connect.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            };
            connect.send(body);
            connect.onreadystatechange = () => {
                if (connect.readyState == 4) {                    
                    console.log(connect.responseText);
                    let answerObj;
                    let responseBody = "нет ответа";
                    try {
                        if (connect.status === 200) {
                            answerObj = JSON.parse(connect.responseText);
                            resolve(answerObj.result);
                        } else {
                            if (connect.responseText !== "") {
                                answerObj = JSON.parse(connect.responseText);
                                responseBody = answerObj.error
                            }                            
                            throw new CustomError(responseBody, connect.status);
                        }
                    } catch (error) {
                        reject(error);
                    }

                };
            }
        })

    };
}
class Product {
    constructor(name, price, product_id, element) {
        this.name = name;
        this.price = price;
        this.product_id = product_id;
        this.element = element.querySelector("#newElementDiv");
        this.screenError = new ScreenError();
        this.element.onclick = () => {
            if (Cookies.checkCookies("role", "admin")) {
                RequestMaker.makeRequest("POST", "http://f0464737.xsph.ru.xsph.ru/base_product/backend/delete_one_product.php", false, "product_id=" + this.product_id)
                    .then((resultObj) => {
                        Content.updatePage();
                    })
                    .catch((error) => {
                        switch (error.status) {                                                       
                            default:
                                this.screenError.showScreenError(error.message);
                                break;
                        }
                    })
            }
        }
    }
}


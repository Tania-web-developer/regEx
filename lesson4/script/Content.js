class Content {
    static Init(element) {
        this.element = element;
        this.container = element.querySelector("#add_container");
        this.greetingDiv = element.querySelector("#greeting");
        this.selectSort = document.querySelector("#sort_select");
        this.btnLogout = document.querySelector("#logout");
        this.screenError = new ScreenError();
        console.log(this.selectSort.options.value);
        this.btnLogout.onclick = () => { this.Logout() };
        this.selectSort.onchange = () => {
            if (this.selectSort.value == "name") {
                this.sortName();
            }
            if (this.selectSort.value == "price") {
                this.sortPrice();
            }
        }
        this.arrProduct = [];
        this.updatePage();
        this.greetingMsg();
        console.log(document.cookie);
    }
    static Logout() {
        Cookies.delCookies("auth", "registration.html");
        Cookies.delCookies("role", "registration.html");
    }
    static createCard(name, price, product_id, pic_src) {
        price = parseFloat(price);
        let template = document.querySelector("#template");
        let newCard = template.content.cloneNode(true);
        newCard.querySelector("img").src = pic_src;
        newCard.querySelector("#nameA").innerHTML = "Name: " + name + " ";
        newCard.querySelector("#priceA").innerHTML = "Price: " + price + " ";
        let newProduct = new Product(name, price, product_id, newCard);
        this.arrProduct.push(newProduct);
        console.log(newProduct);
    }
    static renderPage() {
        this.arrProduct.forEach(element => {
            console.log(element);
            this.container.appendChild(element.element);
        });

    }
    static updatePage() {
        RequestMaker.makeRequest("POST", "http://f0464737.xsph.ru.xsph.ru/base_product/backend/get_all_products.php", false)
            .then((resultObj) => {
                this.container.innerHTML = "";
                this.arrProduct = [];
                resultObj.forEach(element => {
                    this.createCard(element.name, element.price, element.product_id, element.pic_src);
                });
                this.renderPage();

            }).catch((error) => {
                console.log(error.status);
                switch (error.status) {
                    case 204:
                        this.container.innerHTML = error.message;
                        break;                    
                    default:
                        this.screenError.showScreenError(error.message);
                        break;
                }
            })

    }
    static sortName() {
        this.arrProduct.sort((product1, product2) => {
            if (product1.name.toLowerCase() > product2.name.toLowerCase()) {
                return 1;
            }
            if (product1.name.toLowerCase() < product2.name.toLowerCase()) {
                return -1;
            }
            if (product1.name.toLowerCase() == product2.name.toLowerCase()) {
                return 0;
            }
        });
        this.container.innerHTML = "";
        for (let i = 0; i < this.arrProduct.length; i++) {
            this.container.appendChild(this.arrProduct[i].element);
        }
    }
    static sortPrice() {
        this.arrProduct.sort((product1, product2) => {
            if (parseFloat(product1.price) > parseFloat(product2.price)) {
                return 1;
            }
            if (parseFloat(product1.price) < parseFloat(product2.price)) {
                return -1;
            }
            if (parseFloat(product1.price) == parseFloat(product2.price)) {
                return 0;
            }
        });
        this.container.innerHTML = "";
        for (let i = 0; i < this.arrProduct.length; i++) {
            this.container.appendChild(this.arrProduct[i].element);
        }
    }
    static greetingMsg() {
        this.greetingDiv.innerHTML = "Hello" + " " + Cookies.getCookie("role") + " " + Cookies.getCookie("login");
    }
}

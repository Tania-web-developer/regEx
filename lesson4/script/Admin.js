class Admin {
    static Init(element) {
        this.element = element;
        this.form = new AdminForm("admin_form");
        this.form.form.image.addEventListener("keydown", (e) => {
            if (e.key == "Enter") {
                e.preventDefault();
            }
        });
    }
}
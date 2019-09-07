export default class Store_root {
    constructor() {
        this.store_home = new store_home(this);
        this.store_list = new store_list(this);
    }
}


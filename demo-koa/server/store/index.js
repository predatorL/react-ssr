export default async (ctx) => {
    // 两种方式初始化 一种是在new store时传参，一种是调用实例的方法
    const store = new Store();
    return store;
}

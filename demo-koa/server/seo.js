export default (ctx, sourceStr) => {
    let _str = sourceStr;
    // console.log(ctx.request.header)
    const {connection, accept} = ctx.request.header;
    // 根据connection判断客户端是chrome还是firefox，添加不同的用户辅助工具
    // 根据accept判断客户端的语言，配合各地运营调整seo策略
    _str = _str.replace('<title>React App</title>', `<title>${ctx.request.url}</title>`)

    return _str;
}

import Koa from 'koa';
import Router from 'koa-router';
import fs from 'fs';
import KoaStatic from 'koa-static';
import path from 'path';
import render from './render';
import seo from './seo';

const app = new Koa();
const config = {
    port: 3041
}

app.use(
    KoaStatic(path.join(__dirname, '../build'), {
        maxage: 7 * 24 * 60 * 1000,
        index: 'root'
    })
)

let shtml = '';

try {
    shtml = fs.readFileSync(path.join(__dirname, '../build/index.html'), 'utf8');
} catch (error) {
    console.error(error);
}


app.use(
    new Router()
    .get('*', async(ctx, next) => {
        let _shtml = shtml;
        ctx.response.type = 'html';
        // SEO
        _shtml = seo(ctx, _shtml);
        // render
        let renderStr = render(ctx, _shtml);
        ctx.response.body = shtml.replace('<div id="root"></div>', `<div id="root">${renderStr}</div>`)
    })
    .routes()
)

app.listen(config.port, () => {
    console.log(`Listening >>  http://localhost:${config.port}/\n`)
})

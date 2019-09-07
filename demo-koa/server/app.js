import App from '../src/App';
import Koa from 'koa';
import React from 'react';
import Router from 'koa-router';
import fs from 'fs';
import KoaStatic from 'koa-static';
import path from 'path';
import { renderToString } from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';

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
        ctx.response.type = 'html';
        let renderStr = renderToString(
        <StaticRouter location={ctx.request.url} context={{demoName: 'simple'}}>
            <App />
        </StaticRouter>
        )
        ctx.response.body = shtml.replace('<div id="root"></div>', `<div id="root">${renderStr}</div>`)
    })
    .routes()
)

app.listen(config.port, () => {
    console.log(`Listening >>  http://localhost:${config.port}/\n`)
})

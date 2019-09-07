import React from 'react';
import { renderToString } from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import App from '../src/App';
import getContext from './context';
export default async (ctx) => {
    // 从ctx的中获取头信息、url
    let context = await getContext(ctx);

    return renderToString(
        <StaticRouter location={ctx.request.url} context={context}>
            <App />
        </StaticRouter>
    )

}

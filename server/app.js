import koa from 'koa';
import path from 'path';
import render from 'koa-swig';
import * as proxy from './controllers/proxy';
import Router from './routes';

const app = koa();
const router=new Router();

console.log(`env: ${process.env.NODE_ENV}`);

/**
 * setup render
 */
app.context.render = render({
  root: path.join(__dirname, 'views'),
  autoescape: true,
  cache: 'memory', // disable, set to false
  ext: 'html'
});

/**
 * static server for /public
 */
app.use(require('koa-static')(path.join(__dirname, '../build')));

/**
 * setup routes
 */
app.use(router.routes());

const PORT = process.env.PORT || 5000;
app.listen(PORT, err=> {
  process.send && process.send('online');
  console.log(`listening on PORT: ${PORT}`);
});

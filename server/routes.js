import Router from 'koa-router';
import * as proxy from './controllers/proxy';
import * as home from './controllers/home';

export default ()=>{
  var router = new Router({
    prefix:''
  });

  router.all('/proxy/*',proxy.proxy);
  router.get('/',home.index);

  return router;
};

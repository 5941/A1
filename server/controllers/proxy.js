import request from 'request';
import config from 'config';
import Debug from 'debug';
import {agent} from '../lib/agent';

const debug = Debug('app:controllers:api');

export function* proxy(){

  let path = this.url.substring(6)
  path = `${config['proxy']}/${path}`;

  try{
    yield agent(this.req, this.res, path);
  }
  catch(ex){
    this.body=ex;
  }
}

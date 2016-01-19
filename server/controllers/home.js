import {version} from '../../package.json';

/**
 * index
 */
export function* index() {

  yield this.render('index', {
    version:version
  })
}

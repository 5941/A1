import request from 'request';

export function agent(req, res, path) {

  return new Promise((resolve, reject)=> {
    req.pipe(request({
      uri: path,
      method: req.method
    }, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    })).pipe(res);
  });
}

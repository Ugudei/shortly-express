const parseCookies = (req, res, next) => {
  // receive the incoming request and access the cookies property

  //console.log('request.headers.cookies: ', req.headers.cookie);
  // parse them into an object
  if (req.headers.cookie) {
    let parsedCookies = JSON.parse(JSON.stringify(req.headers.cookie));
    let cutUp = parsedCookies.split('; ');
    let cutUpAll = [];
    for (let i = 0; i < cutUp.length; i++) {
      cutUpAll.push(cutUp[i].split('='));
    }
    for (let i = 0; i < cutUpAll.length; i++) {
      var key = cutUpAll[i][0];
      var value = cutUpAll[i][1];
      req.cookies[key] = value;
    }
  }
  //res.end();
  next();
  // res.cookies = parsedCookies;

  //console.log('respond ', res);
};

module.exports = parseCookies;

//
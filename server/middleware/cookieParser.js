const parseCookies = (req, res, next) => {
  // receive the incoming request and access the cookies property
  conosle.log('request: ', req);
  // parse them into an object
  let parsedCookies = JSON.parse(/*cookies fron req */);
  // assign this object to cookies property on the request.
  res.cookies = parsedCookies;

  conosle.log('respomd ', res);
};

module.exports = parseCookies;

//
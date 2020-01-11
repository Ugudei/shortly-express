const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  //accesses the parsed cookies
//   console.log('req body: ', req.body);
//   console.log('req session: ', req.session);
  if (req.cookies.shortlyid) {
    //if we find a cookie
    //create a variable "hash" and setting it equal to the shortlyid property that lives in the cookies object inside the req object
    let hash = req.cookies.shortlyid;
    //getting a record in the table matching specified conditions, and attaching user information if the userId is present on the session object.
    models.Sessions.get({ hash })
      .then(sessionData => {
        //if record excists
        if (sessionData) {
          //set session property equal to session object that Sessions.get returns
          res.session = sessionData;
          //res.cookie sets the HTTP Set-Cookie header with the options provided
          res.cookie('shortlyid', req.session.hash);
          // creating a variable equal to the userID property in sessionData object
          let id = sessionData.userId;
          if (id) {
            //if sucessful, set the userID property in sessions object equal to the id
            req.session.userId = id;
            //get the record that matches the id
            models.Users.get({ id })
              .then(userData => {
                const { username } = userData;
                //set the user of the session equal to the username from the userData
                req.session.user = {username};
                next();
              });
          } else {
            next();
          }
        } else {
          //if we were not able to get information given the cookie
          //create a session
          models.Sessions.create()
            .then(data => {
              models.Sessions.get({id: data.id})
                .then(sessionData => {
                  req.session = sessionData;
                  res.cookie('shortlyid', req.session.hash);
                  next();
                });

              console.log(data);
              // models.Sessions.get({username})
            });
        }
      });
  } else {
    models.Sessions.create()
      .then(data => {
        models.Sessions.get({id: data.insertId})
          .then(sessionData => {
            req.session = sessionData;
            res.cookie('shortlyid', req.session.hash);
          })
          .then(() => {
            let username = req.body.username;
            req.session.user = { username };
            return models.Users.get({username});
          })
          .then(userData => {
            if (userData && userData.id) {
              req.session.userId = userData.id;
            }
            next();
          });
      });
  }
  //     .then(()=>{ res.end(); })
  //     .then(()=> { console.log('then session: ', req.session); })

  //     .then(()=>{ next(); });
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/


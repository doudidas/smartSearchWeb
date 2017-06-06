'use strict';
/* global FB */

window.fbAsyncInit = function() {
  FB.init({
    appId: '307388003034618',
    status: true,
    cookie: true,
    xfbml: true,
    version: 'v2.9'
  });
  FB.getLoginStatus(function(response) {
     console.log(response);
    if (response.status === 'connected') {
      console.log('Logged in.');
    }
    else {
    }
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = '//connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

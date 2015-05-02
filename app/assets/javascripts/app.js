var base2 = "";
var demoApp = angular.module('samsungApp', ['ngRoute', 'infinite-scroll', 'ngProgress']).controller('SamsungController', SamsungController);
demoApp.directive('repeatDone', function() {
        return function(scope, element, attrs) {
            if (scope.$last) { // all are rendered
                scope.$eval(attrs.repeatDone);
            }
        }
    });
demoApp.config(function($httpProvider)
{
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

  $httpProvider.defaults.transformRequest = [function(data)
  {
    var param = function(obj)
    {
      var query = '';
      var name, value, fullSubName, subValue, innerObj, i;
      
      for(name in obj)
      {
        value = obj[name];
        
        if(value instanceof Array)
        {
          for(i=0; i<value.length; ++i)
          {
            subValue = value[i];
            fullSubName = name + '[' + i + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
        }
    }
    else if(value instanceof Object)
    {
      for(subName in value)
      {
        subValue = value[subName];
        fullSubName = name + '[' + subName + ']';
        innerObj = {};
        innerObj[fullSubName] = subValue;
        query += param(innerObj) + '&';
    }
}
else if(value !== undefined && value !== null)
{
  query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
}
}

return query.length ? query.substr(0, query.length - 1) : query;
};

return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
}];
});



var dateFormat = function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
  timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
  timezoneClip = /[^-+\dA-Z]/g,
  pad = function (val, len) {
     val = String(val);
     len = len || 2;
     while (val.length < len) val = "0" + val;
     return val;
 };

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get",
     d = date[_ + "Date"](),
     D = date[_ + "Day"](),
     m = date[_ + "Month"](),
     y = date[_ + "FullYear"](),
     H = date[_ + "Hours"](),
     M = date[_ + "Minutes"](),
     s = date[_ + "Seconds"](),
     L = date[_ + "Milliseconds"](),
     o = utc ? 0 : date.getTimezoneOffset(),
     flags = {
        d:    d,
        dd:   pad(d),
        ddd:  dF.i18n.dayNames[D],
        dddd: dF.i18n.dayNames[D + 7],
        m:    m + 1,
        mm:   pad(m + 1),
        mmm:  dF.i18n.monthNames[m],
        mmmm: dF.i18n.monthNames[m + 12],
        yy:   String(y).slice(2),
        yyyy: y,
        h:    H % 12 || 12,
        hh:   pad(H % 12 || 12),
        H:    H,
        HH:   pad(H),
        M:    M,
        MM:   pad(M),
        s:    s,
        ss:   pad(s),
        l:    pad(L, 3),
        L:    pad(L > 99 ? Math.round(L / 10) : L),
        t:    H < 12 ? "a"  : "p",
        tt:   H < 12 ? "am" : "pm",
        T:    H < 12 ? "A"  : "P",
        TT:   H < 12 ? "AM" : "PM",
        Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
        o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
        S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
    };

    return mask.replace(token, function ($0) {
     return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
 });
};
}();

dateFormat.masks = {
    "default":      "ddd mmm dd yyyy HH:MM:ss",
    shortDate:      "m/d/yy",
    mediumDate:     "mmm d, yyyy",
    longDate:       "mmmm d, yyyy",
    fullDate:       "dddd, mmmm d, yyyy",
    shortTime:      "h:MM TT",
    mediumTime:     "h:MM:ss TT",
    longTime:       "h:MM:ss TT Z",
    isoDate:        "yyyy-mm-dd",
    isoTime:        "HH:MM:ss",
    isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

dateFormat.i18n = {
    dayNames: [
  "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ],
  monthNames: [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ]
};

Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};



function SamsungController($scope, $http, $routeParams, $log, $timeout, ngProgress){
	$scope.user = {name: "Akzhol", id: 1, email: "akzhol.ibraimov@mail.ru"};
}


demoApp.config(function ($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/',
    {
        controller: 'SamsungController',
        templateUrl: '../assets/home.html'
    })
    .when('/consultants/',
    {
        controller: 'SamsungController',
        templateUrl: '../assets/consultants.html'
    })
    .when('/analytics/',
    {
        controller: 'SamsungController',
        templateUrl: '../assets/consultants.html'
    })
    .when('/analytics/:analytic_parameter',
    {
        controller: 'SamsungController',
        templateUrl: '../assets/consultants.html'
    })
    .when('/posts/',
    {
        controller: 'SamsungController',
        templateUrl: '../assets/posts.html'
    })
    .when('/posts/:posts_parameter',
    {
        controller: 'SamsungController',
        templateUrl: '../assets/posts.html'
    })
    .when('/post/:post_id',
    {
        controller: 'SamsungController',
        templateUrl: '../assets/post.html'
    })
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

demoApp.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++)
      input.push(i);
    return input;
  };
});
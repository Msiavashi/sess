var React = require('react-native');
var Alert = React.Alert;
import DB from './database';
var DOMParser = require('xmldom').DOMParser;
var selfService = require('./selfService');
var url = "https://sess.shirazu.ac.ir/sess/Start.aspx";
var sessURL = "https://sess.shirazu.ac.ir/sess/205038594699";
var selfURL = "http://sups.shirazu.ac.ir/SfxWeb/Gate/RemoteLogin.aspx?Token=0010000264234XAuFQh6XaOdcrncataWdO80O&Target=SfxChipWeek&Ret=http://sess.shirazu.ac.ir/sess/FStudent/Student.aspx";
/*TODO: remove this part*/
var username = "";
var password = "";
var doc = "";
var _VIEWSTATE = "";
var _EVENTVALIDATION = "";
var _VIEWSTATEGENERATOR = "";
/************************/

var Login = {
  login : function (usernamee, passworde){
    //do the login things here
    this.getRKey(String(usernamee), String(passworde));
  },

  getRKey : function(usernamee, passworde){
      /*** this propery is counting the times that the server response to our request***/
      /* for the reason xhr was recieving the RKey two time this counter ensures that we are allowed to log in the last time we get the RKey so the cookie */
      if ( typeof this.counter == 'undefined' ) {
        // It has not... perform the initialization
        this.counter = 0;
      }

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.onreadystatechange = (e) => { //when succesfully got the RKey on the last time its time to Hash the password
          //if the readyState was not equal to Done

          if (xhr.readyState !== 4) {
            return;
          }
          if (xhr.status === 200) {
            ++this.counter;
            let pageSource =  xhr.responseText; //gets the response of the request
            let parser = new DOMParser();
            doc = parser.parseFromString(pageSource, "text/xml");   //converts the response Text to document
            var RKeyElement = String(doc.getElementById("_RKey"));
            var RKey = RKeyElement.substring(RKeyElement.search("value"));  //gets the element of from the document
            RKey = RKey.substring(RKey.search("\"")+1, RKey.lastIndexOf("\"")); //getting the 32-digit-long _RKey
/*
            //ViewState
            _VIEWSTATE = String(doc.getElementById("__EVENTVALIDATION"));
            _VIEWSTATE = _VIEWSTATE.substring(_VIEWSTATE.search("value"));
            _VIEWSTATE = _VIEWSTATE.substring(_VIEWSTATE.search('\"') + 1, _VIEWSTATE.lastIndexOf('\"'));

            //_EVENTVALIDATION
            _EVENTVALIDATION = String(doc.getElementById("__EVENTVALIDATION"));
            _EVENTVALIDATION = _EVENTVALIDATION.substring(_EVENTVALIDATION.search("value"));
            _EVENTVALIDATION = _EVENTVALIDATION.substring(_EVENTVALIDATION.search('\"') + 1, _EVENTVALIDATION.lastIndexOf('\"'));

            //_VIEWSTATEGENERATOR
            _VIEWSTATEGENERATOR = String(doc.getElementById("__VIEWSTATEGENERATOR"));
            _VIEWSTATEGENERATOR = _VIEWSTATEGENERATOR.substring(_VIEWSTATEGENERATOR.search("value"));
            _VIEWSTATEGENERATOR = _VIEWSTATEGENERATOR.substring(_VIEWSTATEGENERATOR.search('\"') + 1, _VIEWSTATEGENERATOR.lastIndexOf('\"'));
*/
            if ( this.counter == 1 )  //the last time we get the RKey we are going to hash and log in
            {

              DoLogin(username, password , '', RKey);
              // console.log(Request.getResponseHeader('Set-Cookie'));
            }
          }
          else {
            Alert.alert("error");
          }
        };

      xhr.open('GET', url, true);
      xhr.send(null);
      //xhr.addEventListener("readystatechange", processRequest, true);

  },
}

function binl2hex(binarray) {
    var hex_tab = "0123456789abcdef"
    var str = ""
    for (var i = 0; i < binarray.length * 4; i++) {
        str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
           hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF)
    }
    return str
}

function str2binl(str) {
    var nblk = ((str.length + 8) >> 6) + 1 // number of 16-word blocks
    var blks = new Array(nblk * 16)
    for (var i = 0; i < nblk * 16; i++) blks[i] = 0
    for (var i = 0; i < str.length; i++)
        blks[i >> 2] |= (str.charCodeAt(i) & 0xFF) << ((i % 4) * 8)
    blks[i >> 2] |= 0x80 << ((i % 4) * 8)
    blks[nblk * 16 - 2] = str.length * 8
    return blks
}


function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF)
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
    return (msw << 16) | (lsw & 0xFFFF)
}

function rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt))
}


function cmn(q, a, b, x, s, t) {
    return safe_add(rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b)
}

function ff(a, b, c, d, x, s, t) {
    return cmn((b & c) | ((~b) & d), a, b, x, s, t)
}

function gg(a, b, c, d, x, s, t) {
    return cmn((b & d) | (c & (~d)), a, b, x, s, t)
}

function hh(a, b, c, d, x, s, t) {
    return cmn(b ^ c ^ d, a, b, x, s, t)
}

function ii(a, b, c, d, x, s, t) {
    return cmn(c ^ (b | (~d)), a, b, x, s, t)
}


function coreMD5(x) {
    var a = 1732584193
    var b = -271733879
    var c = -1732584194
    var d = 271733878

    for (i = 0; i < x.length; i += 16) {
        var olda = a
        var oldb = b
        var oldc = c
        var oldd = d

        a = ff(a, b, c, d, x[i + 0], 7, -680876936)
        d = ff(d, a, b, c, x[i + 1], 12, -389564586)
        c = ff(c, d, a, b, x[i + 2], 17, 606105819)
        b = ff(b, c, d, a, x[i + 3], 22, -1044525330)
        a = ff(a, b, c, d, x[i + 4], 7, -176418897)
        d = ff(d, a, b, c, x[i + 5], 12, 1200080426)
        c = ff(c, d, a, b, x[i + 6], 17, -1473231341)
        b = ff(b, c, d, a, x[i + 7], 22, -45705983)
        a = ff(a, b, c, d, x[i + 8], 7, 1770035416)
        d = ff(d, a, b, c, x[i + 9], 12, -1958414417)
        c = ff(c, d, a, b, x[i + 10], 17, -42063)
        b = ff(b, c, d, a, x[i + 11], 22, -1990404162)
        a = ff(a, b, c, d, x[i + 12], 7, 1804603682)
        d = ff(d, a, b, c, x[i + 13], 12, -40341101)
        c = ff(c, d, a, b, x[i + 14], 17, -1502002290)
        b = ff(b, c, d, a, x[i + 15], 22, 1236535329)

        a = gg(a, b, c, d, x[i + 1], 5, -165796510)
        d = gg(d, a, b, c, x[i + 6], 9, -1069501632)
        c = gg(c, d, a, b, x[i + 11], 14, 643717713)
        b = gg(b, c, d, a, x[i + 0], 20, -373897302)
        a = gg(a, b, c, d, x[i + 5], 5, -701558691)
        d = gg(d, a, b, c, x[i + 10], 9, 38016083)
        c = gg(c, d, a, b, x[i + 15], 14, -660478335)
        b = gg(b, c, d, a, x[i + 4], 20, -405537848)
        a = gg(a, b, c, d, x[i + 9], 5, 568446438)
        d = gg(d, a, b, c, x[i + 14], 9, -1019803690)
        c = gg(c, d, a, b, x[i + 3], 14, -187363961)
        b = gg(b, c, d, a, x[i + 8], 20, 1163531501)
        a = gg(a, b, c, d, x[i + 13], 5, -1444681467)
        d = gg(d, a, b, c, x[i + 2], 9, -51403784)
        c = gg(c, d, a, b, x[i + 7], 14, 1735328473)
        b = gg(b, c, d, a, x[i + 12], 20, -1926607734)

        a = hh(a, b, c, d, x[i + 5], 4, -378558)
        d = hh(d, a, b, c, x[i + 8], 11, -2022574463)
        c = hh(c, d, a, b, x[i + 11], 16, 1839030562)
        b = hh(b, c, d, a, x[i + 14], 23, -35309556)
        a = hh(a, b, c, d, x[i + 1], 4, -1530992060)
        d = hh(d, a, b, c, x[i + 4], 11, 1272893353)
        c = hh(c, d, a, b, x[i + 7], 16, -155497632)
        b = hh(b, c, d, a, x[i + 10], 23, -1094730640)
        a = hh(a, b, c, d, x[i + 13], 4, 681279174)
        d = hh(d, a, b, c, x[i + 0], 11, -358537222)
        c = hh(c, d, a, b, x[i + 3], 16, -722521979)
        b = hh(b, c, d, a, x[i + 6], 23, 76029189)
        a = hh(a, b, c, d, x[i + 9], 4, -640364487)
        d = hh(d, a, b, c, x[i + 12], 11, -421815835)
        c = hh(c, d, a, b, x[i + 15], 16, 530742520)
        b = hh(b, c, d, a, x[i + 2], 23, -995338651)

        a = ii(a, b, c, d, x[i + 0], 6, -198630844)
        d = ii(d, a, b, c, x[i + 7], 10, 1126891415)
        c = ii(c, d, a, b, x[i + 14], 15, -1416354905)
        b = ii(b, c, d, a, x[i + 5], 21, -57434055)
        a = ii(a, b, c, d, x[i + 12], 6, 1700485571)
        d = ii(d, a, b, c, x[i + 3], 10, -1894986606)
        c = ii(c, d, a, b, x[i + 10], 15, -1051523)
        b = ii(b, c, d, a, x[i + 1], 21, -2054922799)
        a = ii(a, b, c, d, x[i + 8], 6, 1873313359)
        d = ii(d, a, b, c, x[i + 15], 10, -30611744)
        c = ii(c, d, a, b, x[i + 6], 15, -1560198380)
        b = ii(b, c, d, a, x[i + 13], 21, 1309151649)
        a = ii(a, b, c, d, x[i + 4], 6, -145523070)
        d = ii(d, a, b, c, x[i + 11], 10, -1120210379)
        c = ii(c, d, a, b, x[i + 2], 15, 718787259)
        b = ii(b, c, d, a, x[i + 9], 21, -343485551)

        a = safe_add(a, olda)
        b = safe_add(b, oldb)
        c = safe_add(c, oldc)
        d = safe_add(d, oldd)
    }
    return [a, b, c, d]
}


function str2binl(str) {
    var nblk = ((str.length + 8) >> 6) + 1 // number of 16-word blocks
    var blks = new Array(nblk * 16)
    for (var i = 0; i < nblk * 16; i++) blks[i] = 0
    for (var i = 0; i < str.length; i++)
        blks[i >> 2] |= (str.charCodeAt(i) & 0xFF) << ((i % 4) * 8)
    blks[i >> 2] |= 0x80 << ((i % 4) * 8)
    blks[nblk * 16 - 2] = str.length * 8
    return blks
}


function Md5High(Key, Value) {
    var s = Key + binl2hex(coreMD5(str2binl(Value)));
    return binl2hex(coreMD5(str2binl(s)));
}

/*this only works for test*/
function fetchSelf(){
    var req = new XMLHttpRequest();
    req.onreadystatechange = (e) => {
      if (req.readyState !== 4) {
        return;
      }

      if (req.status === 200) {
        //console.log(req.responseText);
        selfService.setSelfPage(req.responseText);
      }
      else {
        console.log('error' + ' ' + req.status);
      }
    };

  req.open('GET', selfURL, true);
  req.send();

}


function fetchSess(){
  var req = new XMLHttpRequest();
  req.onreadystatechange = (e) => {

    if (req.readyState !== 4) {
      return;
    }

    if (req.status === 200) {
      // console.log('success' + req.responseText);
      fetchSelf();
      // Alert.alert("done");
    }
    else if ( req.status === 302 )
    {
      console.log("this is 302 response");
      console.log(req.responseText);
    }
    else {
      console.log('error' + ' ' + req.status);
    }
  };

req.open('GET', sessURL, true);
// var params="Channel=Act=Ok;&_RKey=&__EVENTVALIDATION=/wEdAAV2jtM7qvfQnGzibIXMs/Xxa3XEE+61AoUroEwTw0TzoBeE+DS6Ew/rKBF70JLTBtZzH/l7PBvth6/ZzHDKK0R0S1f8aOOWPGzSVWaY7KNHgO7t9NXDgONroXff0Gi3QEEviwJ/CzErH/GkuwMuHfSX&__VIEWSTATE=/wEPDwUKMTQ4MDM5MTkwMg9kFgICAQ9kFggCAQ9kFgYCBQ8WAh4JaW5uZXJodG1sZWQCBw8WAh8ABTvYp9iq2LXYp9mEINin2LIg2LfYsdmK2YI62LTYqNqp2Ycg2K/Yp9iu2YTZii3Yp9mK2YbYqtix2YbYqmQCCw8WAh8ABRk8Yj7bsduz27nbtC/bsduxL9ux27Q8L2I+ZAIFDxYCHgdWaXNpYmxlaGQCBw8WAh8BZxYCAgEPFgIfAAXXCdmC2KfYqNmEINiq2YjYrNmHINiv2KfZhti02KzZiNmK2KfZhiDZiNix2YjYr9mKINis2K/ZitivOjxici8+DQoxLdio2Ycg2YXZhti42YjYsSDYp9iz2KrZgdin2K/ZhyDYqNmH2YrZhtmHINin2LIg2LPYp9mF2KfZhtmHINii2YXZiNiy2LTZitiM2b7amNmI2YfYtNmKINmIINiv2KfZhti02KzZiNmK2Yog2K/Yp9mG2LTar9in2Ycg2LTZitix2KfYsiDZhNi32YHYpyDYp9iyINmF2LHZiNix2q/YsSBJbnRlcm5ldCBFeHBsb3Jlctin2LPYqtmB2KfYr9mHINmG2YXYp9mK2YrYry48YnIvPg0KMi3Yr9ixINm+2KfZitin2YYg2KvYqNiqINmG2KfZhSDYp9mK2YbYqtix2YbYqtmKINmE2KfYstmFINin2LPYqiDYqNixINin2LPYp9izINiy2YXYp9mG2KjZhtiv2Yog2qnZhyDYp9iyINi32LHZitmCINiz2KfZhdin2YbZhyDYotmF2YjYsti02Yog2K/YsdmK2KfZgdiqINmF2Yog2YbZhdin2YrZitiv2Iwg2KzZh9iqINir2KjYqiDZhtin2YUg2K3YttmI2LHZiiDYtNiu2LXYpyDZhdix2KfYrNi52Ycg2YHYsdmF2KfZitmK2K8uKioq2KrZiNis2Yc6INiq2KfYsdmK2K4g2KvYqNiqINmG2KfZhSDYrdi22YjYsdmKINio2LEg2KfYs9in2LMg2LLZhdin2YYg2KjZhtiv2Yog2K/Yp9mG2LTar9in2Ycg2KfYsiDYqtin2LHZitiuIDExLzcvMTM5NCgg2YrYp9iy2K/Zh9mFINmF2YfYsSDZhdin2YcpINio2Ycg2KjYudivINmF2Yog2KjYp9i02K8uKioqINis2YfYqiDZhdi02KfZh9iv2Ycg2YbZiNio2Kog2KvYqNiqINmG2KfZhSDYrdi22YjYsdmKINiu2YjYryDYqNmHINiz2KfZhdin2YbZhyDYotmF2YjYsti02Yog2YXYsdin2KzYudmHINmB2LHZhdin2YrZitivLjxici8+DQozLdin2YbYqtiu2KfYqCDZiNin2K3YryDYtNmF2Kcg2KrZiNiz2Lcg2KjYrti0INmF2LHYqNmI2LfZhyDYp9mG2KzYp9mFINiu2YjYp9mH2K8g2LTYry48YnIvPg0KNC3Yp9ix2KfYptmHINix2YrYstmG2YXYsdin2Kog2YXZgti32Lkg2YrYpyDZhdmC2KfYt9i5INmC2KjZhCDYr9ixINiy2YXYp9mGINir2KjYqiDZhtin2YUg2K3YttmI2LHZiiDYp9mE2LLYp9mF2Yog2YXZiiDYqNin2LTYrzxici8+DQo1Ldiu2YjYp9mH2LTZhdmG2K8g2KfYs9iqINin2LIg2YXYsdin2KzYudmHINit2LbZiNix2Yog2Ygg2KrZhNmB2YbZiiDYqNmHINmI2KfYrdivINmH2KfZiiDZhdiu2KrZhNmBINiv2KfZhti02q/Yp9mHINiv2LEg2K7YtdmI2LUg2YXZiNin2LHYryDYqNin2YTYpyDYrtmI2K/Yr9in2LHZiiDZgdix2YXYp9mK2YrYry4NCmQCCQ8WAh8ABQEgZGRDY9B9c/B5YHJtWvxroJcmLKB7mcNVjEPC771IlbjsIQ==&__VIEWSTATEGENERATOR=C792DAE2&banner:zzChanel=&edId=s9332045";
// req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// req.setRequestHeader("Content-length", String(params.length));
// req.setRequestHeader("Connection", "keep-alive");
// req.setRequestHeader("User-Agent", "Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:43.0) Gecko/20100101 Firefox/43.0");
// req.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
// req.setRequestHeader("Accept-Language", "en-US,en;q=0.5");
// req.setRequestHeader("Accept-Encoding", "gzip, deflate");
// req.setRequestHeader("Referer", "https://sess.shirazu.ac.ir/sess/Script/Login.aspx");
// req.setRequestHeader("Cookie", "ASP.NET_SessionId=e2vveqfcyrvwusn3uklcn4zm");
// req.setRequestHeader("Connection", "keep-alive");
req.send();
}

function DoLogin(iId, iPass, iCode, RKey){
    var Inc = Md5High(RKey, iPass);
    // var Req = CreateRequest();
    // console.log( "hashed password is : " +  Inc);

    var Request = new XMLHttpRequest();
    Request.onreadystatechange = (e) => {
      console.log(Request.status);
      if (Request.readyState !== 4) {
        return;
      }

      if (Request.status === 200) {
        console.log('success' + Request.responseText);
        fetchSess();
      }
      else {
        console.log('error' + ' ' + Request.status);
      }
    };

  Request.open('GET', "https://sess.shirazu.ac.ir" + "/sess/Script/AjaxEnvironment.aspx?Act=MakeMember&Id=" + iId + "&Pass=" + Inc + "&Code=" + iCode, true);
  Request.send();
}

module.exports = Login;






///////////AJAX REQUEST TO THE SESS//////////////////////////////

function sendAjax(method,body,contenttype,url) {
  var xhttp = new XMLHttpRequest();

  //if get REQUEST set content to null
  if(method=='Get'){
    body="";
  }
  xhttp.open(method,url, true);
  xhttp.setRequestHeader("Content-type",contenttype);
  xhttp.send(body);
xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      return xhttp.responseText;
    }
  };
}

///////////AJAX REQUEST TO THE SESS//////////////////////////////

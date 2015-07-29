var crypto = require('crypto');

var mSecret = null;

exports.init = function init(secret) {
  mSecret = secret;
};

exports.checkPayResult = function(queryObj) {
  var orderParams = getOrderParams(queryObj);
  var oriSign = queryObj.sign;
  if (!oriSign || orderParams.length === 0) {
    return false;
  }

  var sign = getSignature(orderParams, mSecret);
  return (oriSign.toLowerCase() === sign);
};

function getSignature(params, secret) {
  var basestring = getQueryString(params);
  basestring += secret;
  return md5(basestring);
}


// @return:
//   [[key1, value1], [key2, value2]], and sort by key
var getOrderParams = exports.getOrderParams = function(queryObj) {
  var orderParams = [];
  for (var key in queryObj) {
    if (key !== 'sign') {
      orderParams.push([key, queryObj[key]]);
    }
  }
  return (orderParams = orderParams.sort());
};

var getQueryString = exports.getQueryString = function(params) {
  var rst = [];
  params.forEach(function (p) {
    rst.push(p[0] + '=' + p[1]);
  });
  return rst.join('');
};

var md5 = exports.md5 = function(str) {
  var md5sum = crypto.createHash('md5');
  md5sum.update(str);
  str = md5sum.digest('hex');
  return str;
};
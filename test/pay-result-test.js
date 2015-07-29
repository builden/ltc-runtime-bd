var expect = require('chai').expect;
var bd = require('../lib/pay-result.js');

/*
测试数据
promotion=0, sign=1e1374f6d2568e8c4ae69fd4cdb9b7bf, coupons=0, sp_no=1003, order_no=wzm618_001_1002, pay_time=1436250922, order_id=5634492, paid_amount=1, pay_result=1
*/
var queryObj = {
  promotion: 0,
  sign: '1e1374f6d2568e8c4ae69fd4cdb9b7bf',
  coupons: 0,
  sp_no: 1003,
  order_no: 'wzm618_001_1002',
  pay_time: 1436250922,
  order_id: 5634492,
  paid_amount: 1,
  pay_result: 1
};

var secretKey = '3BT8fjxvsJFNDPZmd6QywMYrS7CXEK1i';

describe('pay-result', function() {
  it.only('checkPayResult test', function() {
    bd.init(secretKey);
    expect(bd.checkPayResult(queryObj)).to.be.ok;
  });

  it('detail test', function() {
    var orderParams = bd.getOrderParams(queryObj);
    var str = bd.getQueryString(orderParams);
    var expectStr = 'coupons=0order_id=5634492order_no=wzm618_001_1002paid_amount=1pay_result=1pay_time=1436250922promotion=0sp_no=1003';
    expect(str).to.equal(expectStr);
    expect(bd.md5(str + secretKey)).to.equal('1e1374f6d2568e8c4ae69fd4cdb9b7bf');
  });
});
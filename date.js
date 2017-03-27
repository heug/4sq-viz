var moment = require('moment');


var tester = 1490414697;
var date  = new Date(tester * 1000);

var momentTest = moment.unix(tester)

console.log(date);
console.log(momentTest);
console.log(Date.now());
// 1490414697
var _ = require('lodash');
var brands = require('./brands');

exports.list = function(event, context) {
    context.succeed(brands);
};

exports.detail = function(event, context) {
    context.succeed(brands[0]);
};

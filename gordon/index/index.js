console.log('Loading function');

exports.handler = function(event, context) {
    context.succeed({
      status: 'ok'
    });
};

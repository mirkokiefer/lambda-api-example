#API Gateway / Lambda examples

**Goal**:

Implementing a Node.js based API with AWS Lambda and API Gateway.
Ideally with no trade-offs compared to the convenience of something like Hapi.js deployed on Heroku.

Having reviewed Apex, Serverless and Gordon I went with the latter one.

- [**Apex**](https://github.com/apex/apex): based on Terraform and only supports Lambda - no Gateway definition.
- [**Serverless**](https://github.com/serverless/serverless): allows definition of both Lambda functions and API Gateways. Seems like it requires plenty of boilerplate to manage a large API. Misses good documentation and examples.
- [**Gordon**](https://github.com/jorgebastida/gordon): has a convenient file structure for managing multiple API services. Feels like its not hiding too much under leaky abstractions. Plenty of [examples](https://github.com/jorgebastida/gordon/tree/master/examples) and [good docs](https://gordon.readthedocs.io/en/latest/). The generated cloudformation scripts and resources are easily accessible.

Some of the roadblocks I stumbled upon and tried to resolve

- **automated tests across multiple functions**:  
  custom shell script like https://github.com/mirkokiefer/lambda-api-example/blob/master/gordon/test.sh
- **automated deployment via CI tool**:  
  demonstrated here with Travis - use gordon and the sample code
  custom cloudformation
- **shared code**:  
  Gordon: common modules with a custom build script (https://gordon.readthedocs.io/en/latest/lambdas.html#build). Has to annoyingly be specified for every single lambda function.
- **integration testing per branch**:
  no Heroku-style PR apps - would have to manually deploy to stages.
- **exclude dev dependencies in deployed code**:
  Gordon: use `npm-install-extra` parameter: https://github.com/mirkokiefer/lambda-api-example/blob/master/gordon/settings.yml#L5
- **managing configuration variables**:  
  configurable in settings.yml
- **managing secrets**
- **custom domain**:  
  supported in API Gateway / cloudfront, needs ssl cert  
  http://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-custom-domains.html
- **handle low latency requests**:
  The spin up time makes it not suitable for low traffic, low latency requirements.
- **gzip responses**:  
  no support and cannot return binary data from lambda - so no workaround available
  https://forums.aws.amazon.com/thread.jspa?threadID=192948
- **30 second timeout**:  
  This is a hardcoded limit of AWS API Gateway and cannot be increased.
  http://docs.aws.amazon.com/apigateway/latest/developerguide/limits.html
- **Vendor lock-in**:  
  You will

The missing gzip support seems like a real blocker.
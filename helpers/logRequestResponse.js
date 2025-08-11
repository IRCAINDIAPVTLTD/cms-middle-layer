const RequestInfo = require('../models/RequestInfo');

const logRequestResponse = async (req, res, next) => {
  const chunks = [];
  
  // Monkey-patch res.send to capture response body
  const originalSend = res.send;
  res.send = function (body) {
    // Capture response body
    chunks.push(body);

    // Call original send with the body
    return originalSend.call(this, body);
  };

  // After response is finished, save request + response info
  res.on('finish', async () => {
    try {
      const ip = req.headers["x-forwarded-for"]?.split(",").shift() || req.socket?.remoteAddress;
      const userAgent = req.headers["user-agent"];

      let responseBody = null;
      if (chunks.length > 0) {
        // body can be Buffer or string or object; try to parse accordingly
        if (typeof chunks[0] === 'string') {
          responseBody = chunks[0];
        } else if (Buffer.isBuffer(chunks[0])) {
          responseBody = chunks[0].toString('utf8');
        } else if (typeof chunks[0] === 'object') {
          responseBody = JSON.stringify(chunks[0]);
        }
      }

      const info = {
        body: Object.keys(req.body || {}).length ? req.body : (Object.keys(req.query || {}).length ? req.query : {}),
        headers: req.headers,
        query: req.query,
        ip_address: ip,
        device_info: userAgent,
        method: req.method,
        url: req.originalUrl,
        response_status: res.statusCode,
        response_body: responseBody,
      };

      await RequestInfo.create(info);
    } catch (error) {
      console.error('Error saving request-response info:', error);
    }
  });

  next();
};

module.exports = logRequestResponse;

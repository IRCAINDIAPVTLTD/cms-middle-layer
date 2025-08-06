// helpers/requestInfo.js

const getRequestInfo = (req) => {
    const ip = req.headers["x-forwarded-for"]?.split(",").shift() || req.socket?.remoteAddress;
    const userAgent = req.headers["user-agent"];
  
    return {
      body: req.body,
      headers: req.headers,
      query: req.query,
      ip_address: ip,
      device_info: userAgent,
      method: req.method,
      url: req.originalUrl,
    };
  };
  
  module.exports = getRequestInfo;
  
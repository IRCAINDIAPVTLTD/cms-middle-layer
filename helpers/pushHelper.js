// helpers/pushHelper.js
const axios = require("axios");
const https = require("https");

const pushToURL = async (url, payload = null, method = "POST", headers = null) => {
  try {
    const options = {
      method,
      url,
      headers: headers || {
        "Content-Type": "application/json"
      },
      timeout: 10000,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false, // ⛔ WARNING: Skips SSL certificate validation
      }),
    };

    if (method === "POST") {
      options.data = payload;
    } else if (method === "GET") {
      options.params = payload;
    }

    console.log(`Making ${method} request to ${url} with payload:`, payload);

    const response = await axios(options);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Push failed:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

module.exports = pushToURL;

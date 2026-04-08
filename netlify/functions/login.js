exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false, message: "Method not allowed" })
    };
  }

  try {
    const { username, password } = JSON.parse(event.body || "{}");

    const validUser = process.env.APP_USERNAME || "admin";
    const validPass = process.env.APP_PASSWORD || "admin123";

    if (username === validUser && password === validPass) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ success: true })
      };
    }

    return {
      statusCode: 401,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false, message: "Invalid username or password" })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false, message: "Server error" })
    };
  }
};

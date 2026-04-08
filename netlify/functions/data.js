const { fetchThingSpeak, num } = require("./_shared");

exports.handler = async () => {
  try {
    const json = await fetchThingSpeak();
    const feeds = Array.isArray(json.feeds) ? json.feeds : [];
    const latest = feeds[feeds.length - 1];

    if (!latest) {
      return {
        statusCode: 404,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "No ThingSpeak data found" })
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        air_temp: num(latest.field1),
        humidity: num(latest.field2),
        water_temp: num(latest.field3),
        tds: num(latest.field4),
        created_at: latest.created_at
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Failed to fetch data", error: error.message })
    };
  }
};

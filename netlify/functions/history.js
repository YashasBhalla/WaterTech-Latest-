const { fetchThingSpeak, num, timeLabel } = require("./_shared");

exports.handler = async () => {
  try {
    const json = await fetchThingSpeak();
    const feeds = Array.isArray(json.feeds) ? json.feeds : [];

    const rows = feeds.map((feed) => ({
      created_at: feed.created_at,
      air_temp: num(feed.field1),
      humidity: num(feed.field2),
      water_temp: num(feed.field3),
      tds: num(feed.field4)
    }));

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        labels: rows.map(r => timeLabel(r.created_at)),
        air_temp: rows.map(r => r.air_temp),
        humidity: rows.map(r => r.humidity),
        water_temp: rows.map(r => r.water_temp),
        tds: rows.map(r => r.tds),
        rows
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Failed to fetch history", error: error.message })
    };
  }
};

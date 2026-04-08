const CHANNEL_ID = "3332187";
const READ_API_KEY = "M5LGZMW76XUKHVD3";
const RESULTS = 12;

async function fetchThingSpeak() {
  const url = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${READ_API_KEY}&results=${RESULTS}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`ThingSpeak request failed: ${response.status}`);
  }

  const json = await response.json();
  return json;
}

function num(v) {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
}

function timeLabel(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}

module.exports = { fetchThingSpeak, num, timeLabel };

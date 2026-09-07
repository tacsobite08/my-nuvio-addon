const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

const manifest = require("./manifest.json");

const TORBOX_API_KEY = process.env.TORBOX_API_KEY;
const TORBOX_API = "https://api.torbox.app/v1/api";

const builder = new addonBuilder(manifest);

builder.defineStreamHandler(async ({ type, id }) => {
  console.log(`Request: ${type}/${id}`);

  if (!TORBOX_API_KEY) {
    console.error("TORBOX_API_KEY is missing");
    return { streams: [] };
  }

  // Basic validation for IMDb IDs
  if (!id || !id.startsWith("tt")) {
    return { streams: [] };
  }

  try {
    const response = await fetch(
      `${TORBOX_API}/torrents/mylist?limit=100`,
      {
        headers: {
          Authorization: `Bearer ${TORBOX_API_KEY}`
        }
      }
    );

    if (!response.ok) {
      console.error("TorBox API error:", response.status);
      return { streams: [] };
    }

    const data = await response.json();

    console.log("TorBox response received");

    // For now, only verify the TorBox connection.
    // Stream matching will be added next.
    return {
      streams: []
    };

  } catch (error) {
    console.error("TorBox request failed:", error);
    return { streams: [] };
  }
});

serveHTTP(builder.getInterface(), {
  port: process.env.PORT || 7000
});

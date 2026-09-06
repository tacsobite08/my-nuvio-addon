const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");
const manifest = require("./manifest.json");

const builder = new addonBuilder(manifest);

builder.defineStreamHandler(async ({ type, id }) => {
  console.log(`Request: ${type}/${id}`);

  return {
    streams: []
  };
});

serveHTTP(builder.getInterface(), {
  port: process.env.PORT || 7000
});

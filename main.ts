import { database } from "./config";

import { City } from "./models/Cities";
import { Logger } from "./lib/Logger";

import { app } from "./bin/app";
import { awaitListen, port } from "./bin/server";

import { httpPort } from "./config";
import { httpHost } from "./config";

import mainRoute from "./routes/main";
import citiesRoute from "./routes/cities";
import weatherRoute from "./routes/weather";

app.use(mainRoute)
app.use(citiesRoute)
app.use(weatherRoute)

async function main() {
  let count = await City.count()
  Logger.log(`SQLite3 have ${count} cities`)

  await awaitListen(httpPort, httpHost)

  Logger.log(`HTTP Server listen on port: ${port()}`)
}

database.serialize(() => {
  Logger.log('SQLite3 Connected')
  main().catch(console.error)
})

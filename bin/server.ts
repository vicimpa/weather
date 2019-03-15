import { Server } from "http";
import app from "./app";
import { Logger } from "../lib/Logger";

const server = new Server(app)

export function awaitListen(port: number, host: string) {
  return new Promise<void>((resolve, reject) => {
    server.once('error', reject)
    server.listen(port, host, () => resolve())
  })
}

export function port() {
  return server.address()['port']
}

export function host() {
  return server.address()['host']
}

Logger.log('Create server')

export {server}
export default server
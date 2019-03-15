import { verbose } from "sqlite3";

const { Database } = verbose()

interface PathDef {
  [key: string]: string
}

export const database = new Database('./db.sqlite')
export const apiKey = '09844ab72fbb4bea4a2f70b4fbb7d88c'

export const indexPage = './index.html'

export const publicPath: PathDef = {
  "/dist": "./dist"
}

export const httpPort = 8080
export const httpHost = '0.0.0.0'

export const citiesLimit = 5
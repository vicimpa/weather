import { database } from "../config";
import { Flags } from "../lib/FlagsAPI";

export class City {
  id: number
  name: string
  country: string
  flag: string
  coord: {
    lon: number
    lat: number
  }

  constructor(data: any[]) {
    let [id, name, country, lon, lat] = data

    this.id = id
    this.name = name
    this.country = country
    this.coord = {
      lon, lat
    }

    this.flag = Flags.get(country)
  }

  private static q = /[^a-z-\s]/ig

  static async find(query: string, limit = 10) {
    query = query.replace(this.q, '')

    return new Promise<City[]>((resolve, reject) => {
      let data: City[] = []

      database.each(`SELECt * FROM cities WHERE name LIKE '${query}%' LIMIT ${limit}`, (err, row) => {
        if (err)
          return reject(err)

        let { id, name, country, lon, lat } = row

        data.push(new City([id, name, country, lon, lat]))

      }, () => resolve(data))
    })
  }

  static async check(name: string) {
    name = name.replace(this.q, '')

    return new Promise<City>((resolve, reject) => {
      database.all(`SELECt id FROM cities WHERE name LIKE '${name}' LIMIT 1`, (err, rows) => {
        if (err)
          return reject(err)

        if (rows && rows[0]) {
          let { id, name, country, lon, lat } = rows[0]

          resolve(new City([id, name, country, lon, lat]))
        }

        resolve(null)
      })
    })
  }

  static async count() {
    return new Promise<number>((resolve, reject) => {
      database.all(`SELECT id FROM cities`, (err, rows) => {
        if (err)
          return reject(err)

        resolve(rows ? rows.length : 0)
      })
    })
  }
}
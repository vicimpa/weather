import { Request } from "./Request";

export class Weather {
  private base = `https://api.openweathermap.org/data/2.5/weather`

  constructor(public appid: string) {}

  async byId(id: number) {
    let { appid, base } = this
    let options = { appid, id }

    return await Request.get(base, options)
  }

  async byName(name: string, country?: string) {
    let { appid, base } = this
    let q = name + (country ? `,${country}` : '')
    let options = { appid, q }

    return await Request.get(base, options)
  }
}
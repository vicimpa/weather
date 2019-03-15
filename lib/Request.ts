import { parse } from "url";
import { stringify} from "querystring";

import { request as rHttp } from "http";
import { request as rHttps } from "https";

export class Request {
  static async get(url: string, data: object = {}) {
    let parsedUrl = parse(url)
    let { protocol = 'http:' } = parsedUrl
    let { host = 'localhost' } = parsedUrl
    let { port = null } = parsedUrl
    let { path = '/' } = parsedUrl

    let reqest = protocol === 'http:' ?
      rHttp : rHttps

    let dataString = stringify(data)

    if(dataString)
      path+=`?${dataString}`

    return new Promise<any>((resolve, reject) => {
      let req = reqest({protocol, host, port, path, method: 'GET'}, (res) => {
        let bytes: number[] = []

        res.on('error', reject)
        res.on('data', (d: Buffer) => d.map(e => bytes.push(e)))
        res.on('end', () => {
          let buff = Buffer.from(bytes).toString('utf-8')

          buff = buff.replace(/https:\/\/static.wax.io/g, '/image')
          
          try{
            let parsed = JSON.parse(buff)
            resolve(parsed)
          }catch(e) {
            resolve(buff)
          } 
        })
      })
      req.on('error', reject)
      req.end()
    })
  }
}
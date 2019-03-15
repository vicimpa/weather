interface IOptions {
  size?: number
  style?: 'flat' | 'shiny'
}

export class Flags {
  static get(country: string, options: IOptions = {}) {
    let {size = 32, style = 'flat'} = options
    
    return `https://www.countryflags.io/`
      + `${country}/${style}/${size}.png`
  }
}
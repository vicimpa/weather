import { DateFormatter } from "./Date";

let colors: {[key: string]: (s: string) => string} = {}

try {
  colors = require('colors')
}catch(e) {}


function argsToString(...preArgs: any[]): string {
  let [name, time, sym, ...args] = preArgs

  if(typeof name !== 'string')
    throw new Error('Name is not a string!')

  if(!(time instanceof DateFormatter))
    throw new Error('Time is not a DateFormatter')

  if(typeof sym !== 'string')
    throw new Error('Symbol is not a string!')
  

  let row: string = ''

  for (let str of args) {
    if (str instanceof Error) {
      let logs: string[] = []

      for (let log of str.stack.split('\n'))
        logs.push((logs.length ? '--' : '') + log.trim())

      return logs.join('\n')
    }
    let strData = typeof str === 'object' ?
      JSON.stringify(str) :
      str.toString()

    if (row.indexOf(sym) !== -1)
      row = row.replace(sym, strData)
    else
      row += strData + ' '
  }

  row = `[${name}] ${row}`
  row = `${time.format()} ${row}`

  return row.trim().replace(/\s{2,}/g, ' ')
}

interface LoggerClass {
  log(...args): void
  info(...args): void
  warn(...args): void
  error(...args): void
}

class LoggerClass {
  constructor(name: string = 'System', sym: string = '{}') {
    let timeFormat = new DateFormatter('hh:mm:ss.SSS')
    let colorsText = {
      info: colors.green,
      warn: colors.yellow,
      log: (s: string) => s,
      error: colors.red
    }

    for (let method of ['log', 'error', 'warn', 'info'])
      this[method] = (...args) => {
        let string = argsToString(name, timeFormat, sym, ...args)
        let colorMethod = colorsText[method]
        let colorString = colorMethod ? 
          colorMethod(string) : string
          
        console[method](colorString)
      }
  }
}

export class Logger extends LoggerClass {
  public static system: Logger = new LoggerClass()
  public static log = Logger.system.log
  public static info = Logger.system.info
  public static warn = Logger.system.warn
  public static error = Logger.system.error
}
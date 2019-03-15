export class DateFormatter {
  private findRegExp = /([a-z]{2,4})/ig
  public format: (date?: Date | number) => string

  private getEvalString(chankString: string) {
    switch (chankString) {
      case 'hh': return '${tc(d.getHours(), 2)}'
      case 'mm': return '${tc(d.getMinutes(), 2)}'
      case 'ss': return '${tc(d.getSeconds(), 2)}'
      case 'SSS': return '${tc(d.getMilliseconds(), 3)}'
      case 'DD': return '${tc(d.getDate(), 2)}'
      case 'MM': return '${tc(d.getMonth() + 1, 2)}'
      case 'YY': return '${tc(d.getFullYear(), 2)}'
      case 'YYYY': return '${tc(d.getFullYear(), 4)}'
      default: return ''
    }
  }

  constructor(private formatString: string = 'hh:mm:ss.SSS') {
    let { findRegExp, getEvalString } = this
    let math: RegExpExecArray = null

    while (math = findRegExp.exec(formatString)) {
      let newString = formatString.replace(math[1], getEvalString(math[1]))
      findRegExp.lastIndex = math.index + (newString.length - formatString.length) + 1
      formatString = newString
    }

    function tc(s: string, c: number) {
      return ('0'.repeat(c) + s).substr(-c)
    }

    let funcBody = `
      if(!d) d = new Date();
      if(!(d instanceof Date)) d = new Date(d);
      ${tc.toString()}
      return \`${formatString}\`
    `

    this.format = <(date: Date) => string>new Function('d', funcBody)
    this.format.toString = () => 'function dateFormat() { [native code] }'
  }
}
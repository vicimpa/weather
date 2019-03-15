import { Router } from "express";

export function upgrade(app: Router | Express.Application) {
  for (let n of ['get', 'pust', 'put', 'delete', 'use']) {
    let old = app[n]

    app[n] = (...args) => {
      let [name, handler = name] = args
      let { length } = args[args.length - 1]
      let argvs = 'abcdefg'.split('')
        .splice(0, length < 3 ? 3 : length)

      let fff = [eval(`(h) => {
        return async function(${argvs.join(', ')}) {
          try {
            let res = await h(${argvs.join(', ')})

            if(res) {
              for(let i of [${argvs.join(', ')}]) {
                if(i && i.send)
                  return i.send(res)
              }
            }
              
          } catch(err) {
            ${argvs.pop()}(err)
          }
        }
      }`)(handler)]
      
      if (name !== handler)
        fff.unshift(name)

      old.apply(app, fff)
    }
  }
}
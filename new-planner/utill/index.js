import { HmacSHA256, SHA256 } from 'crypto-js'
import _ from 'lodash'

/**@typedef {{[x:string]: boolean}} option_obj */
/**@typedef {(string|number|option_obj)[]} option_arr */
/**@typedef {string|number|option_arr|option_obj} option */

/**
 * @type {(style:{[x:string]:string})=>(option:option ...other: string[])=>string}
 *
 * #### ex)
 * ``` jsx
 * import { classOption } from '~~'
 * import style from '~~.module.css'
 * const classname = classOption(style)
 *
 * ...
 *
 * <div className={classname({isRed: true})}></div>
 * ```
 */
export function classOption(style = {}) {
  return (option, ...other) => {
    let result = []
    switch (typeof option) {
      case 'string': {
        result.push(...option.split(' '))
        break
      }
      case 'number': {
        result.push(option.toString())
        break
      }
      case 'object': {
        if (!Array.isArray(option)) {
          let temp = _(option)
            .toPairs()
            .filter(([x, bool]) => bool)
            .map(([x, bool]) => x)
            .value()

          result.push(...temp)
        } else {
          result.push(...classOptionArr(option))
        }
        break
      }
      default: {
        break
      }
    }

    let temp = _.chain(result)
      .map((v) => (style[v] ? `${style[v]}` : v))
      .join(' ')
      .split(' ')
      .union()
      .join(' ')
      .value()
    return other.length ? `${temp} ${other.join(' ')}` : temp
  }
}

/**@type {(optionArr:option_arr)=>string[]} */
function classOptionArr(optionArr) {
  let result = []
  optionArr.forEach((v) => {
    switch (typeof v) {
      case 'string': {
        result.push(v)
        break
      }
      case 'number': {
        result.push(v.toString())
        break
      }
      case 'object': {
        if (!Array.isArray(v)) {
          let temp = _(v)
            .toPairs()
            .filter(([x, bool]) => bool)
            .map(([x, bool]) => x)
            .value()

          result.push(...temp)
        }
        break
      }
      default: {
        break
      }
    }
  })

  return result
}

/**
 * @type {(str:string)=>JSX.Element}
 *
 * ## example
 * ```jsx
 * let str = `hi
 * hello`
 * enterToBr(str)
 * // return ->
 * <span>
 *   <span>hi</span>
 *   <br />
 *   <span>hello</span>
 * </span>
 * ```
 *
 */
export function enterToBr(str) {
  const rand = _.random(1000, 9999)
  let result = str.split('\n').map((v, i) => (
    <span key={HmacSHA256(`${rand}-${i}`, SHA256(str).toString().slice(0, 5)).toString()}>
      <span>{v}</span>
      <br />
    </span>
  ))
  return <>{result}</>
}

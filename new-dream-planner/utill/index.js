import _ from 'lodash'
import { Fragment } from 'react'

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

    let temp = _(result)
      .map((v) => (style[v] ? `${style[v]}` : v))
      .value()
      .join(' ')
      .split(' ')
    temp = `${_(temp).union().value().join(' ')}`
    return other.length ? temp + ` ${other.join(' ')}` : temp
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
 * <>
 * hi<br />
 * hello
 * </>
 * ```
 *
 */
export function enterToBr(str) {
  const rand = _.random(1000, 9999)
  let result = str.split('\n').map((v, i) => (
    <Fragment key={`${rand}-${i}`}>
      {v}
      <br />
    </Fragment>
  ))
  return <>{result}</>
}

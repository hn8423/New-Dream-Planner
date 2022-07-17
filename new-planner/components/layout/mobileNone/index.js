import { classOption } from 'utill'
import style from './index.module.scss'
const classname = classOption(style)

/**@type {(props: {children:any}) => JSX.Element} */
export default function MobileNone({ children }) {
  return <div className={classname('layout-mobile')}>{children}</div>
}

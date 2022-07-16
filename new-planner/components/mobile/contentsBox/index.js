import { classOption } from 'utill/index'
import style from './index.module.scss'

const classname = classOption(style)

export default function ContentBox({ className, children }) {
  return <div className={classname(['contents-box', className])}>{children}</div>
}

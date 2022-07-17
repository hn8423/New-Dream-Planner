import LayoutFooter from './footer'
import LayoutHeader from './header'

import { classOption } from 'utill'
import style from './index.module.scss'
const classname = classOption(style)

export default function Layout({ isLogined, ...props }) {
  return (
    <div className={classname('layout-pc')}>
      <div className={classname('header-contents')}>
        <div className={classname('contents')}>{props.children}</div>
        <LayoutHeader className={classname('header')} isLogined={isLogined} />
      </div>
      <LayoutFooter className={classname('footer')} />
    </div>
  )
}

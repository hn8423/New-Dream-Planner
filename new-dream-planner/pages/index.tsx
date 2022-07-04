import type { NextPage } from 'next'
import { classOption } from 'utill/index'
import style from './index.module.scss'
const classname = classOption(style)
// import Head from 'next/head'
// import Image from 'next/image'



const Mission: NextPage = () => {

  return (
    <div className={classname('mission')}>
      <div className={classname('text')}>
        
      </div>
      <div className={classname('social')}></div>
    </div>
   )
}

export default Mission

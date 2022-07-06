import type { NextPage } from 'next'
import { classOption } from 'utill/index'
import style from './index.module.scss'
const classname = classOption(style)
import { useRouter } from 'next/router'

// import Head from 'next/head'
// import Image from 'next/image'



const Mission: NextPage = () => {
  const router = useRouter()

  function pass(){
    router.push('/signin')
  }
  return (
    <div className={classname('mission')}>
      <div className={classname('text')}>
        
      </div>
      <div className={classname('social')} onClick={pass}>
        <h1>로그인하기</h1>
      </div>
    </div>
   )
}

export default Mission

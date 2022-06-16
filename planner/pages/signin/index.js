import { classOption } from 'utill/index'
import style from './index.module.scss'
import { useRouter } from 'next/router'
// import Button from "components/mobile/button/blue";
// import R_icon from "components/r_icon";
import React, { useRef, useState, useMemo, useEffect } from 'react'
import useSignWith from 'hooks/useSignWith'
import { useSelector } from 'react-redux'

const classname = classOption(style)
function Signin() {
  /**@type {[React.MutableRefObject<HTMLInputElement>, React.MutableRefObject<HTMLInputElement>]} */
  const inputPw = useRef(null)

  // const lang = useSelector((state) => state.lang)
  const lang = useState('ko')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const signWith = useSignWith({ email, password })
  const router = useRouter()
  const [passwordType, setPasswordType] = useState({
    type: 'password',
    visible: false,
  })

  const [globalText] = useState({
    emailInput: {
      en: 'Enter your email address',
      ko: '이메일을 입력해주세요',
    },
    passwordInput: {
      en: 'Enter your Password',
      ko: '비밀번호를 입력해주세요',
    },
    signUpButton: {
      en: 'Sign Up',
      ko: '회원가입',
    },
    signInButton: {
      en: 'Sign In',
      ko: '로그인',
    },
    ChangePw: {
      en: 'Forgot your password?',
      ko: '비밀번호 찾기',
    },
    isFull: {
      en: 'There are items that are not entered!',
      ko: '입력되지 않은 항목이 있습니다!',
    },
    isValid: {
      en: 'Enter correctly',
      ko: '올바르게 입력해주세요',
    },
    isStandard: {
      en: 'Check the password',
      ko: '비밀번호를 확인해주세요',
    },
    isEmailValid: {
      en: 'Enter the email format correctly',
      ko: '이메일 형식을 올바르게 입력해주세요',
    },
    isStandard: {
      en: 'Check the password',
      ko: '비밀번호를 확인해주세요',
    },
    isEmailValid: {
      en: 'Enter the email format correctly',
      ko: '이메일 형식을 올바르게 입력해주세요',
    },
    failedSignIn: {
      en: `account or password is not valid.`,
      ko: `계정 또는 비밀번호가 옳바르지 않습니다.`,
    },
  })

  // memo
  // memo
  // memo

  const isFailedSignIn = useMemo(() => {
    return !!router.query.error && router.query.error === 'CredentialsSignin'
  }, [router.query.error])

  const isFull = useMemo(() => {
    return Boolean(email && password)
  }, [email, password])

  const isStandard = useMemo(() => {
    const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
    return reg.test(password)
  }, [password])

  const isEmailValid = useMemo(() => {
    const reg =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    return reg.test(email)
  }, [email])

  //password type 변경하는 함수
  const handlePasswordType = (e) => {
    setPasswordType(() => {
      if (!passwordType.visible) {
        return { type: 'text', visible: true }
      }
      return { type: 'password', visible: false }
    })
  }

  /**@type {(url:string)=>()=>void} */
  function routerPush(url) {
    return () => {
      router.push(url)
    }
  }
  /**@type {(ref: React.MutableRefObject<HTMLInputElement>)=>(e:KeyboardEvent) => void} */
  function pressEnter(ref) {
    return (e) => {
      if (e.key !== 'Enter') {
        return
      }

      if (ref) {
        ref.current.focus()
      } else {
        clickNext(signWith('credentials'))()
      }
    }
  }

  function onClickMoveToMain() {
    router.push('/mobile')
  }

  //method
  //method
  //method

  function clickNext(fn) {
    return () => {
      if (!isFull) {
        alert(globalText.isFull[lang])
        return
      }

      if (!isStandard) {
        alert(globalText.isStandard[lang])
        return
      }
      if (!isEmailValid) {
        alert(globalText.isEmailValid[lang])
        return
      }
      fn()
    }
  }

  //effect
  //effect
  //effect

  useEffect(() => {
    if (isFailedSignIn) {
      alert(globalText.failedSignIn[lang])
    }
  }, [globalText, isFailedSignIn, lang])
  //render
  //render
  //render
  return (
    <>
      <div className={classname('main')}>
        <div className={classname('main-text')}>
          <h1>
            간편하게 <br /> 로그인하세요
          </h1>
        </div>

        <div className={classname('main-social')}>
          <img className={classname('main-social-img')} src="/images/mobile/social/Goole.png" alt="google-icon" onClick={signWith('google')} />
          <img className={classname('main-social-img')} src="/images/signin/kakaobutton.png" alt="kakao-icon" onClick={signWith('kakao')} />
        </div>
      </div>
    </>
  )
}
Signin.layout = 'mobile-none'

export default Signin


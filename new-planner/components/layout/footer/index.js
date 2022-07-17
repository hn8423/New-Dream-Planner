import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'
import style from './index.module.scss'
import { classOption, enterToBr } from 'utill'
const classname = classOption(style)

const globalText = {
  contents: {
    en: 'Metavity Co., Ltd. CEO : Ryan Byun\n        Business address: 4th floor, Daon Building, 8 Teheran-ro 27-gil, Gangnam-gu, Seoul\n        TEL : 82-2-567-2888 　 FAX: 82-2-567-2889',
    ko: '(주)메타비티 대표 : 변원섭 \n        사업자 등록 번호 : 289-86-01305\n        주소 : 서울시 강남구 테헤란로 27길 8 다온빌딩 4층\n        TEL : 82-2-567-2888 　 FAX: 82-2-567-2889',
  },
  email: {
    en: 'Inquiry email :',
    ko: '이메일 문의 :',
  },

  copyrightAlert: {
    en: 'The contents of this site are protected by copyright law. Unauthorized reproduction, copying, distribution, etc. is prohibited.',
    ko: '이 사이트의 내용은 저작권법에 의해 보호됩니다. 무단 복제·복사·배포 등의 행위를 하는 경우에는 금지되어 있습니다.',
  },
  copyright: {
    en: 'Copyright © 2019-2022 Metavity Co.,LTD. All Rights Reserved.',
    ko: '저작권 | 2019-2022 (주)메타비티 모든 권리 보유.',
  },
  footerMenu1: {
    en: 'About us',
    ko: '메타비티 소개',
  },
  footerMenu2: {
    en: 'Terms of Use',
    ko: '이용약관',
  },
  footerMenu3: {
    en: 'Privacy Policy',
    ko: '개인정보 정책',
  },
}

export default function LayoutFooter({ className }) {
  const router = useRouter()

  function onClickMoveTo_About_Us() {
    router.push('http://rndasia.co.kr/')
  }
  function onClickMoveTo_Privacy_Policy() {
    router.push('/Privacy_Policy/')
  }
  function onClickMoveTo_Terms_of_Use() {
    router.push('/Terms_of_Use/')
  }
  function onClickMoveToMain() {
    router.push('/')
  }

  const lang = useSelector((state) => state.lang) // store의 state를 불러오는 hook   store의 state 중에서 count의 state를 불러온다.

  return (
    <div className={classname(['footer', className])}>
      <div className={classname('top-wrapper')}>
        <img className={classname('logo')} src="/images/Layout/logo.png" alt="toestlogo" onClick={onClickMoveToMain} />
        <div className={classname('right')}>
          <div className={classname(['menu'], 'body16')} onClick={onClickMoveTo_About_Us}>
            {globalText.footerMenu1[lang]}
          </div>
          <div className={classname(['menu'], 'body16')} onClick={onClickMoveTo_Terms_of_Use}>
            {globalText.footerMenu2[lang]}
          </div>
          <div className={classname(['menu'], 'body16')} onClick={onClickMoveTo_Privacy_Policy}>
            {globalText.footerMenu3[lang]}
          </div>
        </div>
      </div>
      <div className={classname(['text-wrapper'], 'body14')}>
        <div className={classname(['text'], 'body14')}>{enterToBr(globalText.contents[lang])}</div>
        <div className={classname(['text'], 'body14')}>
          <span>{globalText.email[lang]}</span>
          <span className={classname('text')}>
            <a className={classname('email')} href="mailto:support@metavity.world">
              support@metavity.world
            </a>
          </span>
        </div>
        <br />

        <div className={classname(['text'], 'body14')}>{enterToBr(globalText.copyrightAlert[lang])}</div>
        <div className={classname(['copyright'], 'body14')}>{globalText.copyright[lang]}</div>
      </div>
    </div>
  )
}

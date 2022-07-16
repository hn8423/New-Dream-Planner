export const initialState = 'en' // 처음 state값으로 count 0을 주었다. state값은 객체, 배열로도 사용할 수 있다.

export const LANGUAGE_ENGLISH = 'LANGUAGE_ENGLISH' // count 1을 증가시킬 액션 타입이다.
export const LANGUAGE_KOREAN = 'LANGUAGE_KOREAN' // count 1을 감소시킬 액션 타입이다.

export const languageOnEn = () => ({
  // 액션 생성 함수
  type: LANGUAGE_ENGLISH,
})

export const languageOnKo = () => ({
  type: LANGUAGE_KOREAN,
})

const reducer = (state = initialState, action) => {
  // 리듀서
  switch (
    action.type // 액션의 type이 COUNT_PLUS일땐 state에 + 1 COUNT_MINUS 일 땐 state에 -1
  ) {
    case LANGUAGE_ENGLISH:
      return (state = 'en')
    case LANGUAGE_KOREAN:
      return (state = 'ko')
    default:
      return state
  }
}

export default reducer

export const initialState = false // 처음 state값으로 count 0을 주었다. state값은 객체, 배열로도 사용할 수 있다.

export const LOGIN_ON = 'LOGIN_ON' // count 1을 증가시킬 액션 타입이다.
export const LOGIN_OFF = 'LOGIN_OFF' // count 1을 감소시킬 액션 타입이다.

export const loginOnAction = () => ({
  // 액션 생성 함수
  type: LOGIN_ON,
})

export const loginOffAction = () => ({
  type: LOGIN_OFF,
})

const reducer = (state = initialState, action) => {
  // 리듀서
  switch (
    action.type // 액션의 type이 COUNT_PLUS일땐 state에 + 1 COUNT_MINUS 일 땐 state에 -1
  ) {
    case LOGIN_ON:
      return (state = true)
    case LOGIN_OFF:
      return (state = false)
    default:
      return state
  }
}

export default reducer

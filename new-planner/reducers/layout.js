export const initialState = "pc"; // 처음 state값으로 count 0을 주었다. state값은 객체, 배열로도 사용할 수 있다.

export const LAYOUT_PC = "LAYOUT_PC"; // count 1을 증가시킬 액션 타입이다.
export const LAYOUT_MOBILE = "LAYOUT_MOBILE"; // count 1을 감소시킬 액션 타입이다.

export const layoutOnPc = () => ({
  // 액션 생성 함수
  type: LAYOUT_PC,
});

export const layoutOnMobile = () => ({
  type: LAYOUT_MOBILE,
});

const reducer = (state = initialState, action) => {
  // 리듀서
  switch (
    action.type // 액션의 type이 COUNT_PLUS일땐 state에 + 1 COUNT_MINUS 일 땐 state에 -1
  ) {
    case LAYOUT_PC:
      return (state = "pc");
    case LAYOUT_MOBILE:
      return (state = "mobile");
    default:
      return state;
  }
};

export default reducer;

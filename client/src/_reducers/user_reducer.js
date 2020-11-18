import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
} from '../_actions/types';


export default function (previousState = {}, action) { // previousState = 빈 값
    switch (action.type) {
        case LOGIN_USER:
            return { ...previousState, login_reducerNextState: action.payload } // ... 스프레드 오퍼레이터 : 인자로 받은 previousState를 그대로 가져옴 // login_reducerNextState 로 store 내 데이터가 더떤 동작으로 저장되었는지 구분?
            // store로 이동(이전 state, 변경된 state)
            // 이전 state는 request완료되어 필요없어서 빈값으로 만드나?

        case REGISTER_USER:
            return { ...previousState, register_reducerNextState: action.payload }
        
        case AUTH_USER:
            return { ...previousState, auth_reducerNextState: action.payload }

        default:
            return previousState;
    }
}
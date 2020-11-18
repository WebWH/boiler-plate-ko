import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
} from './types';

export function loginUser(requestBody) {
    
    // redux 활용하기 위해 user_action.js 에서 request
    const responseData = axios.post('/api/users/login', requestBody)
                        .then(response => response.data) 

    return { // user_reducer.js 로 return
        type: LOGIN_USER, // user가 로그인 했다는 것을 설명하기 위해 명시
        payload: responseData, // 이름은 반드시 payload // user가 로그인 했는데 어떤 user인지는 data에 있다.
    }

}


export function registerUser(requestBody) {
    
    // redux 활용하기 위해 user_action.js 에서 request
    const responseData = axios.post('/api/users/register', requestBody)
                        .then(response => response.data) 

    return { // user_reducer.js 로 return
        type: REGISTER_USER, // user가 로그인 했다는 것을 설명하기 위해 명시
        payload: responseData, // 이름은 반드시 payload // user가 로그인 했는데 어떤 user인지는 data에 있다.
    }

}


export function auth() { // GET request이므로 바디 필요없음
    
    // redux 활용하기 위해 user_action.js 에서 request
    const responseData = axios.get('/api/users/auth')
        .then(response => response.data) 

    return { // user_reducer.js 로 return
        type: AUTH_USER, // user가 로그인 했다는 것을 설명하기 위해 명시
        payload: responseData, // 이름은 반드시 payload // user가 로그인 했는데 어떤 user인지는 data에 있다.
    }

}
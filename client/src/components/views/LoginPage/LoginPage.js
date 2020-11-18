import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("") // state이름, setter
    const [Password, setPassword] = useState("") // 초기값 "" 으로 설정

    const onEmailChange = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordChange = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); // 버튼 클릭 시 페이지 리프레시 방지

        let requestBody = {
            email: Email,
            password: Password,
        }

        // Action : 여기서 request하지 않고 user_action.js에서 request
        dispatch(loginUser(requestBody))
            .then(response => {
                console.log(response); /* type, payload */
                if(response.payload.loginSuccess) {
                    props.history.push('/') // / 로 페이지 이동
                } else {
                    alert('이메일 또는 비밀번호를 확인해주세요.')
                }
            })
        // 여기서 dispatch => Action(user_action.js) => Reducer(user_reducer.js) => Store => 여기
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler} >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailChange} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordChange} />

                <br />
                <button>
                    로그인
                </button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)

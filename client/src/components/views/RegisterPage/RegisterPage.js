import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("") // state이름, setter
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("") // 초기값 "" 으로 설정
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailChange = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameChange = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordChange = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordChange = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); // 버튼 클릭 시 페이지 리프레시 방지

        if(Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
        }

        let requestBody = {
            email: Email,
            name: Name,
            password: Password,
        }

        // Action : 여기서 request하지 않고 user_action.js에서 request
        dispatch(registerUser(requestBody))
            .then(response => {
                console.log(response); /* type, payload */
                if(response.payload.success) {
                    props.history.push('/login') // 페이지 이동
                } else {
                    alert('회원가입에 실패했습니다.')
                }
            })
        // 여기서 dispatch => Action(user_action.js) => Reducer(user_reducer.js) => Store => 여기
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler} >
                <label>이메일</label>
                <input type="email" value={Email} onChange={onEmailChange} />
                
                <label>이름</label>
                <input type="test" value={Name} onChange={onNameChange} />

                <label>비밀번호</label>
                <input type="password" value={Password} onChange={onPasswordChange} />

                <label>비밀번호 확인</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordChange} />

                <br />
                <button>
                    회원 가입
                </button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)

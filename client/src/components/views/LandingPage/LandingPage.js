import React, { useEffect } from 'react'
import axios from 'axios';
// import { response } from 'express';
import { withRouter } from 'react-router-dom';

function LandingPage(props) {

    useEffect(() => {
        axios.get('/api/hello') /* GET method Request */
        .then(response => { console.log(response.data) }) /* Response */
    }, [])

    const onClickLogout = () => {
        axios.get(`/api/users/logout`)
        .then(response => {
            if(response.data.success) {
                props.history.push('/login') // 페이지 이동
            } else {
                alert('로그아웃 하는데 실패 했습니다.')
            }
        })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>

            <button onClick={onClickLogout}>
                로그아웃
            </button>


        </div>
    )
}

export default withRouter(LandingPage)
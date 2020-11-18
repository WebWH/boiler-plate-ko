import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) { // SpecificComponent: 화면 component // option: 인증/인가 // adminRoute: 관리자만 허용인 경우 true

    /* option
    null : 아무나 출입
    true : 로그인한 유저만 출입
    false : 로그인한 유저는 출입불가
    */

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        // 유저 정보 request
        useEffect(() => {
            
            dispatch(auth()).then(response => {
                // console.log(response);

                // 로그인 X
                if(!response.payload.isAuth){
                    if(option){
                        props.history.push('/login')
                    }
                } else {
                    // 로그인 O
                    if(adminRoute && !response.payload.isAdmin){
                        props.history.push('/')
                    } else {
                        if(option === false){
                            props.history.push('/')
                        }
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}
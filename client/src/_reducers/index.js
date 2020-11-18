import { combineReducers } from 'redux'; // 다수 reducer 합치기
import user from './user_reducer';

const rootReducer = combineReducers({
    user,
})

export default rootReducer;
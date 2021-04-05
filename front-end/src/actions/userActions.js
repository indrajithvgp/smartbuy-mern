import axios from 'axios'

export const logIn = (email, password) => async(dispatch) => {
    try{
        dispatch({type:'USER_LOGIN_REQUEST'})

        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/users/login', {email, password}, config)

        dispatch({type:'USER_LOGIN_SUCCESS', payload: data})
        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(err){
        dispatch({type:'USER_LOGIN_FAIL', 
        payload:err.response && err.response.data.message ? err.response.data.message:err.message})
    }
}


export const logOut = () => async(dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type:"USER_LOGOUT"})
}
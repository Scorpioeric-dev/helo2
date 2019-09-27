const initialState = {
    username:'',
    profile_pic:''
}


//action constant
const SET_USER = 'SET_USER'


//action builder

export const setUser = (user) => {
    return {
        type:SET_USER,
        payload:user
    }
}



//reducer function

const reducer = (state = initialState,action) => {
    const {payload} = action
    switch (action.type){
        case SET_USER:
            const {username,profile_pic} = payload
            return{...state,username,profile_pic}
            default:
                return state
    }
}



export default reducer
const initialState = {
  username: "",
  profile_pic: ""
};

//action constant
export const SET_USER = "SET_USER";

//action builder

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
}

//reducer function

export default (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case SET_USER:
      const { username, profile_pic } = payload;
      return { ...state, username, profile_pic };
    default:
      return state;
  }
};

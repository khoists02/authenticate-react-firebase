import userApi from 'api/userApi';

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

//  Thunk API
// export const signIn = createAsyncThunk(
//   'user/signIn',
//   async (params, thunkAPI) => {
//     const response = await userApi.signIn(params);

//     // Save access token to storage
//     const { access_token, token_type, expired_at } = response;
//     const accessToken = `${token_type} ${access_token}`;
//     localStorage.setItem('access_token', accessToken);
//     localStorage.setItem('expired_at', expired_at); // expired_at is a timestamp
//   }
// );

export const getMe = createAsyncThunk('user/getMe', async (params, thunkAPI) => {
  // thunkAPI.dispatch(...)
  const currentUser = await userApi.getMe();
  return currentUser;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: {}, // here initial defauu
  },
  reducers: {
    logout: (state, action) =>{
      state.current = {};
    }
  },
  extraReducers: {
    [getMe.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  }
});

const { reducer: userReducer, actions } = userSlice;
export const { logout } = actions;
export default userReducer;
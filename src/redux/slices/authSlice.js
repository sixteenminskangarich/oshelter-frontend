import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const getUserFromLocalStorage = () => {
	const userString = localStorage.getItem('user');
	return userString ? JSON.parse(userString) : null;
};

const getTokenFromLocalStorage = () => {
	return localStorage.getItem('token') || null;
};
export const login = createAsyncThunk(
	'auth/login',
	async (loginData, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_APP_SERVICE_URL}/login`,
				loginData
			);
			return response.data; // Expecting { token, user }
		} catch (error) {
			console.log(error);
			
			return rejectWithValue(error.response.data);
		}
	}
);

export const register = createAsyncThunk(
	'auth/register',
	async (userData, thunkAPI) => {
		try {
            const response = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/register`, {
                method: "POST",	
                headers: { 
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            })
            const res = await response.json()
            return res
        } catch (e) {
			console.log(e)
            return thunkAPI.rejectWithValue(error.response.data);
        }
	}
);

export const forgotPassword = createAsyncThunk(
	'auth/forgotPassword',
	async (email, thunkAPI) => {
		try {
			const response = await axios.post(
				'https://api.example.com/forgot-password',
				{ email }
			);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const resetPassword = createAsyncThunk(
	'auth/resetPassword',
	async (data, thunkAPI) => {
		try {
			const response = await axios.post(
				'https://api.example.com/reset-password',
				data
			);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: getUserFromLocalStorage(),
		token: getTokenFromLocalStorage(),
		property: null,
		error: null,
		isLoading: false,
	},
	reducers: {
		logout: (state) => {
			localStorage.removeItem('user');
			localStorage.removeItem('token');
			state.user = null;
			state.token = null;
		},
		setCurrentUser: (state, action) => {
            state.user = action.payload.data 
            state.token = action.payload.token
            localStorage.setItem('user', JSON.stringify(action.payload.data))
			localStorage.setItem('token', action.payload.token)
        },
		setChangeUser: (state, action) => {
			state.user = action.payload.data 
			localStorage.setItem('user', JSON.stringify(action.payload.data))
		},
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.isLoading = false;
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				// Debugging log
				state.isLoading = false;
				state.user = action.payload.data;
				state.token = action.payload.token;
				state.error = null;
				localStorage.setItem('user', JSON.stringify(action.payload.data));
				localStorage.setItem('token', action.payload.token);
			})
			.addCase(register.fulfilled, (state, action) => {
				state.user = action.payload.data;
				state.token = action.payload.token;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload || action.error.message;
			})
			.addCase(register.rejected, (state, action) => {
				state.error = action.payload;
			});
	},
});

export const { logout, clearError, setCurrentUser, setChangeUser } = authSlice.actions;

export default authSlice.reducer;
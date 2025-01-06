import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// Async thunk for adding a friend
export const add_friend = createAsyncThunk(
  "chat/add_friend",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(
        "/chat/customer/add-customer-friend",
        info
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for sending a message
export const send_message = createAsyncThunk(
  "chat/send_message",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(
        "/chat/customer/send-message-to-seller",
        info
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Chat slice
export const chatReducer = createSlice({
  name: "chat",
  initialState: {
    my_friends: [], //seller
    fd_messages: [],
    currentFd: "",
    successMessage: "",
    errorMessage: "",
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    updateMessage: (state, { payload }) => {
      state.fd_messages = [...state.fd_messages, payload];
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle add_friend.fulfilled
      .addCase(add_friend.fulfilled, (state, { payload }) => {
        state.fd_messages = payload.messages;
        state.currentFd = payload.currentFd;
        state.my_friends = payload.myFriends;
      })
      // Handle add_friend.rejected
      .addCase(add_friend.rejected, (state, { payload }) => {
        state.errorMessage = payload?.error || "Failed to add friend";
      })
      // Handle send_message.fulfilled
      .addCase(send_message.fulfilled, (state, { payload }) => {
        const tempFriends = [...state.my_friends];
        const index = tempFriends.findIndex(
          (f) => f.fdId === payload.message.receverId
        );

        if (index > 0) {
          const [friend] = tempFriends.splice(index, 1);
          tempFriends.unshift(friend);
        }

        state.my_friends = tempFriends;
        state.fd_messages = [...state.fd_messages, payload.message];
        state.successMessage = "Message sent successfully";
      })
      // Handle send_message.rejected
      .addCase(send_message.rejected, (state, { payload }) => {
        state.errorMessage = payload?.error || "Failed to send message";
      });
  },
});

export const { messageClear, updateMessage } = chatReducer.actions;
export default chatReducer.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// Async Thunks
export const place_order = createAsyncThunk(
  "order/place_order",
  async (
    { price, products, shipping_fee, shippingInfo, userId, navigate, items },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.post("/home/order/place-order", {
        price,
        products,
        shipping_fee,
        shippingInfo,
        userId,
        items,
      });

      navigate("/payment", {
        state: {
          price: price + shipping_fee,
          items,
          orderId: data.orderId,
        },
      });

      return true;
    } catch (error) {
      console.error(error.response);
      return rejectWithValue(error.response?.data || "Order placement failed");
    }
  }
);

export const get_orders = createAsyncThunk(
  "order/get_orders",
  async ({ customerId, status }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get-orders/${customerId}/${status}`
      );
      return data;
    } catch (error) {
      console.error(error.response);
      return rejectWithValue(error.response?.data || "Failed to fetch orders");
    }
  }
);

export const get_order = createAsyncThunk(
  "order/get_order",
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/home/customer/get-order/${orderId}`);
      return data;
    } catch (error) {
      console.error(error.response);
      return rejectWithValue(error.response?.data || "Failed to fetch order");
    }
  }
);

// Slice
const orderSlice = createSlice({
  name: "order",
  initialState: {
    myOrders: [],
    myOrder: {},
    totalOrder: 0,
    pendingOrder: 0,
    cancelledOrder: 0,
    recentOrders: [],
    successMessage: "",
    errorMessage: "",
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Place Order
      .addCase(place_order.fulfilled, (state) => {
        state.successMessage = "Order placed successfully";
      })
      .addCase(place_order.rejected, (state, { payload }) => {
        state.errorMessage = payload;
      })

      // Get Orders
      .addCase(get_orders.fulfilled, (state, { payload }) => {
        state.myOrders = payload.orders;
      })
      .addCase(get_orders.rejected, (state, { payload }) => {
        state.errorMessage = payload;
      })

      // Get Order
      .addCase(get_order.fulfilled, (state, { payload }) => {
        state.myOrder = payload.order;
      })
      .addCase(get_order.rejected, (state, { payload }) => {
        state.errorMessage = payload;
      });
  },
});

export const { messageClear } = orderSlice.actions;
export default orderSlice.reducer;

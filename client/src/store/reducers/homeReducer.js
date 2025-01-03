import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// Fetch categories
export const get_category = createAsyncThunk(
  "product/get_category",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/home/get-categorys");

      return fulfillWithValue(data);
    } catch (error) {
      console.error("Error fetching categories:", error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch products
export const get_products = createAsyncThunk(
  "product/get_products",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/home/get-products");

      return fulfillWithValue(data);
    } catch (error) {
      console.error("Error fetching products:", error.response);
      return rejectWithValue(error.response.data);
    }
  }
);
export const price_range_product = createAsyncThunk(
  "product/price_range_product",
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get("/home/price-range-latest-product");
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const query_products = createAsyncThunk(
  "product/query_products",
  async (query, { fulfillWithValue, rejectWithValue }) => {
    try {
      // Dynamically build query string by checking if parameters are valid
      const params = new URLSearchParams();

      if (query.category) params.append("category", query.category);
      if (query.rating) params.append("rating", query.rating);
      if (query.low !== undefined && query.low !== null)
        params.append("lowPrice", query.low);
      if (query.high !== undefined && query.high !== null)
        params.append("highPrice", query.high);
      if (query.sortPrice) params.append("sortPrice", query.sortPrice);
      if (query.pageNumber) params.append("pageNumber", query.pageNumber);
      if (query.searchValue) params.append("searchValue", query.searchValue);

      const queryString = params.toString();
      console.log("Generated query string:", queryString); // Debugging the query string

      const { data } = await api.get(`/home/query-products?${queryString}`);
      return fulfillWithValue(data);
    } catch (error) {
      console.error(
        "Error fetching queried products:",
        error.response || error
      );
      return rejectWithValue(
        error.response?.data || "Failed to query products."
      );
    }
  }
);

export const get_product = createAsyncThunk(
  "product/get_product",
  async (slug, { fulfillWithValue, rejectWithValue }) => {
    if (!slug) {
      console.error("Error: 'slug' is undefined");
      return rejectWithValue("Product slug is missing.");
    }

    try {
      const { data } = await api.get(`/home/get-product/${slug}`);
      console.log("Product data fetched:", data);
      return fulfillWithValue(data);
    } catch (error) {
      console.error("Error fetching product:", error.response);
      return rejectWithValue(
        error.response?.data || "Failed to fetch the product."
      );
    }
  }
);

export const customer_review = createAsyncThunk(
  "review/customer_review",
  async (info, { fulfillWithValue }) => {
    try {
      const { data } = await api.post("/home/customer/submit-review", info);
      return fulfillWithValue(data);
    } catch (error) {}
  }
);

export const get_reviews = createAsyncThunk(
  "review/get_reviews",
  async ({ productId, pageNumber }, { fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get-reviews/${productId}?pageNo=${pageNumber}`
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {}
  }
);

export const homeReducer = createSlice({
  name: "home",
  initialState: {
    categorys: [],
    products: [],
    latest_product: null,
    topRated_product: null,
    discount_product: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    priceRange: {
      low: 0,
      high: 100,
    },
    product: {},
    relatedProducts: [],
    moreProducts: [],
    successMessage: "",
    errorMessage: "",
    totalReview: 0,
    rating_review: [],
    reviews: [],
    banners: [],
  },

  reducers: {
    messageClear: (state, _) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },

  extraReducers: (builder) => {
    // Handle get_category
    builder
      .addCase(get_category.pending, (state) => {
        state.status = "loading";
      })
      .addCase(get_category.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.categorys = payload.categorys;
      })
      .addCase(get_category.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "Failed to fetch categories.";
      })
      .addCase(get_products.fulfilled, (state, { payload }) => {
        console.log("Fetched products:", payload); // Log the fetched data
        state.status = "succeeded";
        state.products = payload.products; // Ensure payload.products is an array
        state.latest_product = payload.latest_product;
        state.topRated_product = payload.topRated_product;
        state.discount_product = payload.discount_product;
      })
      .addCase(get_products.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "Failed to fetch products.";
      })
      .addCase(price_range_product.fulfilled, (state, { payload }) => {
        state.latest_product = payload.latest_product;
        state.priceRange = payload.priceRange;
      })
      .addCase(query_products.fulfilled, (state, { payload }) => {
        state.products = payload.products;
        state.totalProduct = payload.totalProduct;
        state.parPage = payload.parPage;
      })
      .addCase(query_products.pending, (state) => {
        state.status = "loading";
      })
      .addCase(query_products.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "Failed to query products.";
      })

      .addCase(get_product.fulfilled, (state, { payload }) => {
        state.product = payload?.product || {};
        state.relatedProducts = payload?.relatedProducts || [];
        state.moreProducts = payload?.moreProducts || [];
      })
      .addCase(customer_review.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })
      .addCase(get_reviews.fulfilled, (state, { payload }) => {
        state.reviews = payload.reviews;
        state.totalReview = payload.totalReview;
        state.rating_review = payload.rating_review;
      });
  },
});
export const { messageClear } = homeReducer.actions;
export default homeReducer.reducer;

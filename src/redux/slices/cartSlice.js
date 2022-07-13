import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAPI } from '../../utils/dataFetching';
import { success, failure } from './alertSlice';

const initialState = {
    products: [],
    count: 0,
    total: 0
};

export const getCart = createAsyncThunk(
    'cart/getCart',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const requestObject = {
                method: 'GET',
                url: 'cart'
            };

            const { data, message } = await fetchAPI(requestObject);
            console.log(data);
            dispatch(success(message));

            return data;
        } catch (err) {
            console.error(err);
            dispatch(failure(err.message));
            rejectWithValue(err);
        }
    }
);

export const saveCart = createAsyncThunk(
    'cart/saveCart',
    async (_, { dispatch, rejectWithValue, getState }) => {
        try {
            const { products, count, total } = getState().cart;

            const requestObject = {
                url: 'save/cart',
                method: 'POST',
                body: {
                    products: readyCartData(products),
                    count,
                    total
                }
            };

            const { message } = await fetchAPI(requestObject);

            dispatch(success(message));
            return;
        } catch (err) {
            console.error(err);
            dispatch(failure(err.message));
            rejectWithValue(err);
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct(state, { payload }) {
            const product = state.products.find(p => p.data.id === payload.id);

            if (product) product.count += 1;
            else state.products.push({ data: payload, count: 1 });

            state.total = fixPrecision(state.total + getFinalPrice(payload.amount, payload.sale));
            state.count += 1;
        },
        removeProduct(state, { payload: { id } }) {
            state.products = state.products.filter(product => {
                if (product.data.id === id) {
                    state.count -= product.count;
                    state.total = fixPrecision(state.total - getFinalPrice(product.data.amount, product.data.sale, product.count));
                    return false;
                }
                return true;
            });
        },
        increaseCount(state, { payload: { id } }) {
            state.products = state.products.map(product => {
                if (product.data.id === id) {
                    state.count += 1;
                    state.total = fixPrecision(state.total + getFinalPrice(product.data.amount, product.data.sale));
                    product.count += 1;
                }
                return product;
            });
        },
        decreaseCount(state, { payload: { id } }) {
            state.products = state.products.filter(product => {
                if (product.data.id === id) {
                    state.count -= 1;
                    state.total = fixPrecision(state.total - getFinalPrice(product.data.amount, product.data.sale));
                    product.count -= 1;
                    if (product.count === 0) return false;
                }
                return true;
            });
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCart.fulfilled, (state, { payload }) => {
            if (payload.empty) {
                state.count = 0;
                state.total = 0;
                state.products = [];
            } else {
                state.count = payload.count;
                state.total = payload.total;
                state.products = payload.products.map(({ product, quantity }) => ({ data: filterAction(product), count: quantity }));
            }
        });
        builder.addDefaultCase(state => state);
    }
});

export const readyCartData = (products) => {
    return products.map(product => (
        {
            id: product.data.id,
            count: product.count
        }
    ));
};

export const filterAction = (payload) => {
    return {
        id: payload.id,
        title: payload.title,
        subtitle: payload.subtitle,
        image: payload.image,
        amount: payload.amount,
        sale: payload.sale
    };
};

export const getFinalPrice = (amount, sale, count = 1) => {
    return fixPrecision((amount - (amount * sale / 100)) * count);
};

export const fixPrecision = (amount) => {
    return Number(parseFloat(amount).toFixed(2));
};

export const { addProduct, removeProduct, increaseCount, decreaseCount } = cartSlice.actions;

export default cartSlice.reducer;
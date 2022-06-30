import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    count: 0,
    total: 0
};

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
    }
});

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
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
            let flag = true;

            state.products.forEach(product => {
                if (product.data.id === payload.id) {
                    flag = false;
                    product.count += 1;
                }
            });

            if (flag) state.products.push({ data: payload, count: 1 });

            state.total += getPrice(payload.amount, payload.sale);
            state.count += 1;
        },
        removeProduct(state, { payload: { id } }) {
            state.products = state.products.filter(product => {
                if (product.data.id === id) {
                    state.count -= product.count;
                    state.total -= getPrice(product.data.amount, product.data.sale) * product.count;
                    return false;
                }
                return true;
            });
        },
        increaseCount(state, { payload: { id } }) {
            state.products = state.products.map(product => {
                if (product.data.id === id) {
                    state.count += 1;
                    state.total += getPrice(product.data.amount, product.data.sale);
                    product.count += 1;
                }
                return product;
            });
        },
        decreaseCount(state, { payload: { id } }) {
            state.products = state.products.filter(product => {
                if (product.data.id === id) {
                    state.count -= 1;
                    state.total -= getPrice(product.data.amount, product.data.sale);
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

export const getPrice = (amount, sale) => {
    return amount - (amount * sale / 100);
};

export const { addProduct, removeProduct, increaseCount, decreaseCount } = cartSlice.actions;

export default cartSlice.reducer;
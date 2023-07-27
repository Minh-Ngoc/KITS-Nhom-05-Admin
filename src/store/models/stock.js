import axios from "axios";
import { GET_STOCK_BY_ID_PRODUCT, ADD_STOCK, DELETE_STOCK } from "api";
import { toast } from 'react-toastify';

export const stock = {
    state: {
        stockList: [],
    }, // initial state
    reducers: {
      // handle state changes with pure functions
      setStock(state, stockList) {
        return {
            ...state,
            stockList
        }
      },

    },
    effects: (dispatch) => ({
      // handle state changes with impure functions.
      // use async/await for async actions
        async addStock(data) {
            await axios.post(ADD_STOCK, data)
              .then(res => this.setStock(res.data.stock))
              .catch(err => console.log(err))
        },
        fetchStockByIdProduct(productId) {
            axios.get(`${GET_STOCK_BY_ID_PRODUCT}/${productId}`)
                .then(res => this.setStock(res.data.stock))
                .catch(err => console.log(err))
        },
        deleteStock(stockId) {
            axios.delete(`${DELETE_STOCK}/${stockId}`)
                .then(res => {
                  toast.success(`DELETE PRODUCT SUCCESSFULY !`, {
                    position: toast.POSITION.TOP_CENTER
                  })
                })
                .catch(err => console.log(err))
        }
    }),
    selectors: (slice, createSelector) => ({
        selectStock() {
            return slice(state => state.stock)
        },

    })
};
import axios from "axios";
import { STATISTIC_ORDER_BY_MONTH, GET_ORDERS, GET_ORDER_BY_ID } from "api";
import { toast } from "react-toastify";

export const orders = {
    state: {
        orderList: [],
    }, // initial state
    reducers: {
      // handle state changes with pure functions
        setOrders(state, orderList) {
            return {
                ...state,
                orderList
            }
        },
        setOrder(state, order) {
            return {
                ...state,
                order,
            }
        },
        setOrdersByMonth(state, orderStatistics) {
            return {
                ...state,
                orderStatistics
            }
        },

    },
    effects: (dispatch) => ({
      // handle state changes with impure functions.
      // use async/await for async actions
        fetchOrders() {
            axios.get(GET_ORDERS) 
                .then(res => this.setOrders(res.data.orderwithusername))
                .catch(err => console.log(err))
        },
        getOrderById(orderId) {
            axios.get(GET_ORDER_BY_ID, { params: { orderIds: orderId } })
                .then(res => this.setOrder(res.data.orderwithusername))
                .catch(err => toast.error("GET ORDERS FAILURE", {
                    position: toast.POSITION.TOP_CENTER,
                }))
        },
        statisticOrderByMonth() {
            axios.get(STATISTIC_ORDER_BY_MONTH) 
                .then(res => this.setOrdersByMonth(res.data.orderstatistics))
                .catch(err => console.log(err))
        }
    }),
    selectors: (slice, createSelector) => ({
        selectSizes() {
            return slice(state => state.orders)
        },

    })
};
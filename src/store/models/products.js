import axios from "axios";
import { GET_PRODUCT, ADD_PRODUCT, DELETE_PRODUCT, FILTER_PRODUCT_BY_NAME } from "api";
import { toast } from 'react-toastify';

export const products = {
    state: {
        productList: [],
    }, // initial state
    reducers: {
      // handle state changes with pure functions
      setProducts(state, productList) {
        return {
            ...state,
            productList
        }
      },

    },
    effects: (dispatch) => ({
      // handle state changes with impure functions.
      // use async/await for async actions
      fetchProducts(payload, rootState) {
        axios.get(GET_PRODUCT)
          .then(res => this.setProducts(res.data.product))
          .catch(res => toast.error(`CAN NOT GET PRODUCT FROM DATABASE!`, {
            position: toast.POSITION.TOP_CENTER
          }))
      },
      addProduct(data) {
        axios.post(ADD_PRODUCT, data)
          .then(res => {
            this.setProducts(res.data.product);
            dispatch.products.fetchProducts();
            toast.success(`ADD NEW PRODUCT SUCCESSFULY !`, {
              position: toast.POSITION.TOP_CENTER
            })
          })
          .catch(res => toast.error(`ADD NEW PRODUCT FAILURE!`, {
            position: toast.POSITION.TOP_CENTER
          }))
      },
      deleteProduct(productId) {
        axios.delete(`${DELETE_PRODUCT}/${productId}`) 
          .then(res => {
            dispatch.products.fetchProducts();
            toast.success(`DELETE PRODUCT SUCCESSFULY !`, {
              position: toast.POSITION.TOP_CENTER
            })
          })
          .catch(res => toast.error(`DELETE PRODUCT FAILURE!`, {
            position: toast.POSITION.TOP_CENTER
          }))
      },
      filterProductByName(productName) {
        if(productName) {
          axios.get(`${FILTER_PRODUCT_BY_NAME}/${productName}`) 
            .then(res => this.setProducts(res.data.product))
            .catch(res => toast.error(`PRODUCT NOT FOUND!`, {
              position: toast.POSITION.TOP_CENTER
            }))
        } else {
          dispatch.products.fetchProducts();
        }

        }
    }),
    selectors: (slice, createSelector) => ({
        selectProducts() {
            return slice(state => state.products)
        },

    })
};
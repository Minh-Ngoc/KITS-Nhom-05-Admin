import axios from "axios";
import { GET_SIZE, ADD_SIZE } from "api";

export const sizes = {
    state: {
        sizeList: [],
    }, // initial state
    reducers: {
      // handle state changes with pure functions
      setSizes(state, sizeList) {
        return {
            ...state,
            sizeList
        }
      },

    },
    effects: (dispatch) => ({
      // handle state changes with impure functions.
      // use async/await for async actions
        fetchSizes() {
            axios.get(GET_SIZE)
            .then(res => this.setSizes(res.data.size))
            .catch(err => console.log(err))
      },
        addSize(data) {
            axios.post(ADD_SIZE, data)
                .then(res => this.setSizes(res.data.size))
                .catch(err => console.log(err))
      }
    }),
    selectors: (slice, createSelector) => ({
        selectSizes() {
            return slice(state => state.sizes)
        },

    })
};
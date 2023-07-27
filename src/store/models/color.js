import axios from "axios";
import { GET_COLOR, ADD_COLOR } from "api";

export const colors = {
    state: {
        colorList: [],
    }, // initial state
    reducers: {
      // handle state changes with pure functions
      setColors(state, colorList) {
        return {
            ...state,
            colorList
        }
      },

    },
    effects: (dispatch) => ({
      // handle state changes with impure functions.
      // use async/await for async actions
        fetchColors() {
            axios.get(GET_COLOR)
            .then(res => this.setColors(res.data.color))
            .catch(err => console.log(err))
      },
        addColor(data) {
            axios.post(ADD_COLOR, data)
                .then(res => this.setColors(res.data.color))
                .catch(err => console.log(err))
      }
    }),
    selectors: (slice, createSelector) => ({
        selectColors() {
            return slice(state => state.colors)
        },

    })
};
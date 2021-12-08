import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL} from '../constants/productConstants'

export const productListReducer = (state = {products: []}, action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST: 
            return {loading: true, products: [], error: false}
        case PRODUCT_LIST_SUCCESS: 
            return {loading: true, products: action.payload, error: false}
        case PRODUCT_LIST_FAIL: 
            return {loading: false, products: action.payload, error: true}
        default:
            return state
    }
}
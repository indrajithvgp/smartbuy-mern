import {createStore, combineReducers, applyMiddleware}  from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productReducer, productDetailsReducer, 
    productTopRatedReducer,productDeleteReducer,productReviewCreateReducer, productUpdateReducer, productCreateReducer} from './reducers/productReducer'
import {cartReducer} from './reducers/cartReducers'
import {orderCreateReducer, orderDetailsReducer, orderPayReducer,
    orderListReducer, orderListMyReducer, orderDeliverReducer} from './reducers/orderReducer'
import {userLoginReducer, userRegisterReducer, userDetailsReducer,
    userListReducer, userUpdateProfileReducer, userDeleteReducer, userUpdateReducer} from './reducers/userReducers'

const reducer = combineReducers({
    productList:productReducer,
    productDetails:productDetailsReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    productTopRated:productTopRatedReducer,
    productReviewCreate:productReviewCreateReducer,
    cart:cartReducer,
    userLogIn:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdatedProfile:userUpdateProfileReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,
    userList:userListReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderListMy:orderListMyReducer,
    orderList:orderListReducer,
    orderDeliver:orderDeliverReducer,

})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')):[]
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')):null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')):{}

const initialState = {
    cart:{
        cartItems:cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogIn:{
        userInfo:userInfoFromStorage
    }
}

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store

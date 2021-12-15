import React, {useEffect} from 'react'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import Message from '../components/Message'
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from '../actions/cartActions'
import { useLocation } from "react-router-dom";


const CartScreen = () => {

    const location = useLocation();
    const productId = location.pathname.substring(
        location.pathname.lastIndexOf("/") + 1,
        location.length
      );
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    console.log('cartItems', cartItems)
    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])



    return (
        <div>
            Cart 1 2 3
        </div>
    )
}

export default CartScreen

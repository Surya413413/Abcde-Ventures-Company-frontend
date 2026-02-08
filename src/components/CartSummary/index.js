import React from 'react'
import Popup from 'reactjs-popup'

import PaymentPage from '../PaymentPage'

import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0

      cartList.forEach(eachCartItem => {
        total += eachCartItem.price * eachCartItem.quantity
      })

      return (
        <>
          <div className="cart-summary-container">
            <h1 className="order-total-value">
              <span className="order-total-label">Order Total:</span> Rs {total} /-
            </h1>
            <p className="total-items">{cartList.length} Items in cart</p>

            <Popup
              className="popup-container"
              modal
              trigger={
                <div>
                  <button type="button" className="checkout-button">
                    Checkout
                  </button>
                </div>
              }
              position="top left"
            >
              {close => <PaymentPage close={close} />}
            </Popup>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary

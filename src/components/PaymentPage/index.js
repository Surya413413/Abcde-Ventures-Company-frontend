

import {useContext, useState} from 'react'

import CartContext from '../../context/CartContext'

import './index.css'

const PaymentMethodsList = [
  {
    id: 'CARD',
    displayText: 'Card',
    isInActive: true,
  },
  {
    id: 'NET BANKING',
    displayText: 'Net Banking',
    isInActive: true,
  },
  {
    id: 'UPI',
    displayText: 'Upi',
    isInActive: true,
  },
  {
    id: 'CASH ON DELIVERY',
    displayText: 'Cash on Delivery',
    isInActive: false,
  },
  {
    id: 'WALLET',
    displayText: 'Wallet',
    isInActive: true,
  },
]

const PaymentPage = () => {
  const {cartList} = useContext(CartContext)

  const [currentPaymentMethod, setPaymentMethod] = useState('')
  const [currentIsOrderPlace, setIsOrderPlace] = useState(false)

  const updatePaymentMethod = event => {
    const {id} = event.target
    setPaymentMethod(id)
  }

  const getTotalPrice = () =>
    cartList.reduce((acc, items) => acc + items.quantity * items.price, 0)

  const onPlaceOrder = () => {
    setIsOrderPlace(true)
  }

  const renderPaymentMothds = () => (
    <ul className="unoder-container">
      {PaymentMethodsList.map(each => (
        <li className="list-litems" key={each.id}>
          <input
            id={each.id}
            type="radio"
            name="currentPaymentMethod"
            disabled={each.isInActive}
            onChange={updatePaymentMethod}
          />
          <label htmlFor={each.id}>{each.displayText}</label>
        </li>
      ))}
    </ul>
  )

  return (
    <div className='payment-container'>
      {currentIsOrderPlace ? (
        <p>Your order has been placed successfully</p>
      ) : (
        <>
          <h1>Payments Details</h1>
          <p>Payments Methods</p>
          {renderPaymentMothds()}
          <div>
            <p>Order details:</p>
            <p>Quantity: {cartList.length}</p>
            <p>Total Price: RS {getTotalPrice()}/-</p>
          </div>

          <button
            disabled={currentPaymentMethod === ''}
            type="button"
            onClick={onPlaceOrder}
            className='buttoncheck'
          >
            Confirm Order
          </button>
        </>
      )}
    </div>
  )
}

export default PaymentPage

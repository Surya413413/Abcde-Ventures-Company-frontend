import {Component} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Loginpage from './components/Loginpage'
import Home from './components/Home'  
import Registerpage from './components/Registerpage'

import Forgotpassword from './components/Forgotpassword'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    this.setState(prev => ({
      cartList: prev.cartList.map(each =>
        each.id === id ? {...each, quantity: each.quantity + 1} : each
      ),
    }))
  }

  decrementCartItemQuantity = id => {
    const product = this.state.cartList.find(each => each.id === id)

    if (product.quantity > 1) {
      this.setState(prev => ({
        cartList: prev.cartList.map(each =>
          each.id === id ? {...each, quantity: each.quantity - 1} : each
        ),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    this.setState(prev => ({
      cartList: prev.cartList.filter(each => each.id !== id),
    }))
  }

  addCartItem = product => {
    const existingProduct = this.state.cartList.find(
      each => each.id === product.id
    )

    if (existingProduct) {
      this.setState(prev => ({
        cartList: prev.cartList.map(each =>
          each.id === product.id
            ? {...each, quantity: each.quantity + product.quantity}
            : each
        ),
      }))
    } else {
      this.setState(prev => ({
        cartList: [...prev.cartList, product],
      }))
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            removeCartItem: this.removeCartItem,
            removeAllCartItems: this.removeAllCartItems,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
          }}
        >
          <Routes>
            {/* Default redirect */}
            {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}

            {/* Public Routes */}
            <Route path="/login" element={<Loginpage />} />
            <Route path="/register" element={<Registerpage />} />
            <Route path="/forgotpassword" element={<Forgotpassword />} />

            {/* Protected Routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />

            <Route
              path="/products/:id"
              element={
                <ProtectedRoute>
                  <ProductItemDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />

            {/* Not Found */}
          <Route path="/not-found" element={<NotFound />} />
  <Route path="*" element={<NotFound />} />
          </Routes>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App








import {Component} from 'react'
import {Link, useParams} from 'react-router-dom'
import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import CartContext from '../../context/CartContext'
import Header from '../Header'


import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    productData: {},
    similarProductsData: [],
    apiStatus: apiStatusConstants.initial,
    quantity: 1,
  }

  componentDidMount() {
    this.getProductData()
  }

  getFormattedData = data => ({
    id: data.id,
    title: data.name,
    brand: data.brand || 'Generic',
    description: data.description,
    price: data.price,
    imageUrl: data.image_url,
    rating: data.rating || 4,
    availability: 'In Stock',
    totalReviews: 100,
  })

  getProductData = async () => {
    const {id} = this.props.params
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwtToken')
    const apiUrl = `http://localhost:3000/items/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(apiUrl, options)

      if (!response.ok) {
        this.setState({apiStatus: apiStatusConstants.failure})
        return
      }

      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData)

      this.setState({
        productData: updatedData,
        similarProductsData: [], // backend does not send similar products
        apiStatus: apiStatusConstants.success,
      })
    } catch (error) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container">
      <ThreeDots height="50" width="50" color="#0b69ff" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="error view"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  onIncrementQuantity = () => {
    this.setState(prev => ({quantity: prev.quantity + 1}))
  }

  onDecrementQuantity = () => {
    this.setState(prev =>
      prev.quantity > 1 ? {quantity: prev.quantity - 1} : null
    )
  }

  renderProductDetailsView = () => (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value
        const {productData, quantity} = this.state

        const {
          title,
          brand,
          description,
          imageUrl,
          price,
          rating,
          availability,
          totalReviews,
        } = productData

        const onClickAddToCart = () => {
          addCartItem({...productData, quantity})
        }

        return (
          <div className="product-details-success-view">
            <div className="product-details-container">
              <img src={imageUrl} alt="product" className="product-image" />
              <div className="product">
                <h1 className="product-name">{title}</h1>
                <p className="price-details">Rs {price}/-</p>

                <div className="rating-and-reviews-count">
                  <div className="rating-container">
                    <p className="rating">{rating}</p>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                      alt="star"
                      className="star"
                    />
                  </div>
                  <p className="reviews-count">{totalReviews} Reviews</p>
                </div>

                <p className="product-description">{description}</p>

                <div className="label-value-container">
                  <p className="label">Available:</p>
                  <p className="value">{availability}</p>
                </div>

                <div className="label-value-container">
                  <p className="label">Brand:</p>
                  <p className="value">{brand}</p>
                </div>

                <hr className="horizontal-line" />

                <div className="quantity-container">
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={this.onDecrementQuantity}
                  >
                    <BsDashSquare />
                  </button>
                  <p className="quantity">{quantity}</p>
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={this.onIncrementQuantity}
                  >
                    <BsPlusSquare />
                  </button>
                </div>

                <button
                  type="button"
                  className="button add-to-cart-btn"
                  onClick={onClickAddToCart}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderProductDetails()}
        </div>
      </>
    )
  }
}

/*  React Router v6 wrapper */
const ProductItemDetailsWrapper = () => {
  const params = useParams()
  return <ProductItemDetails params={params} />
}

export default ProductItemDetailsWrapper



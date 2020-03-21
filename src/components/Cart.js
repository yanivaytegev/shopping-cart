import React, { Component } from 'react'
import util from '../util';

export default class Cart extends Component {

  render() {

    const { cartItems, handleRemoveFromCart } = this.props
    return (
      <div className="container">
        <div className="shopping-cart">
          <div className="shopping-cart-header">
            <i className="fa fa-shopping-cart cart-icon"></i><span className="badge">{this.props.count}</span>
            <div className="shopping-cart-total">
              <span className="lighter-text">Total: </span>
              <span className="main-color-text">{util.formatCurrency(cartItems.reduce((a, c) => (a + c.price * c.count), 0))}</span>
            </div>
          </div>
          <ul className="shopping-cart-items">
            {cartItems.length ? <div><div>you have {cartItems.length} items in cart</div><hr /></div> : 'Empty Cart'}
            {cartItems.length ?
              <div>
                {cartItems.map(item => (
                  <div key={item.id}>
                    <li className="clearfix">
                      <img src={`products/${item.sku}_2.jpg`} width='50px' height='50px' alt="item1" />
                      <span className="item-name">{item.title}</span>
                      <span className="item-price">${item.price}</span>
                      <span className="item-quantity">Qty: {item.count}</span>
                      <button className='btn btn-danger' onClick={e => handleRemoveFromCart(e, item)}>X</button>
                    </li>
                    <hr />
                  </div>
                ))
                }
                <a href='#checkout' onClick={(e) => this.props.clearCart(e)} className='button'>Checkout</a>
              </div>
              : null}
          </ul>
        </div>
      </div>
    )
  }
}
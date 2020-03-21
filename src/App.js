import React, { useState, useEffect } from 'react';
import './App.css';
import Products from './components/Products'
import Filter from './components/Filter';
import Cart from './components/Cart';
import $ from 'jquery';

function App() {

  const [state, setState] = useState({
    products: [],
    filteredProducts: [],
    load: true,
    size: '',
    sort: '',
    cartItems: [],
    modal: false
  })


  useEffect(() => {

    $("#btnCart").click(function () {
      $(".shopping-cart").stop(true, false).fadeToggle('slow');
    })

    if (state.load) {
      let ls = localStorage.getItem('cartItems')

      if (ls === null) {
        ls = '[]';
      }

      fetch(`http://localhost:8000/products`)
        .then(res => res.json())
        .then(data => {
          setState({
            ...state,
            products: data,
            filteredProducts: data,
            load: false,
            cartItems: JSON.parse(ls),
          })
        })
        .catch(err => err)
    }
  })

  $("#btnCart").click(function () {
    $(".shopping-cart").stop(true, false).fadeToggle('slow');
  })


  const listProducts = () => {
    setState(state => {
      if (state.sort !== '') {
        state.products.sort((a, b) =>
          state.sort === "Lowest" ? a.price > b.price ? 1 : -1 : a.price < b.price ? 1 : -1);
      } else {
        state.products.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      if (state.size !== '') {
        return {
          ...state,
          filteredProducts: state.products.filter(a => a.availableSizes.indexOf(state.size.toUpperCase()) > -1)
        };
      }
      return { ...state, filteredProducts: state.products };
    });
  };

  const handleAddToCart = (e, product) => {

    setState(state => {
      const cartItems = state.cartItems;
      let alreadyInCart = false;
      cartItems.forEach(item => {
        if (item.id === product.id) {
          alreadyInCart = true;
          item.count += 1
        }
      })
      if (!alreadyInCart) {
        cartItems.push({ ...product, count: 1 })
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cartItems: cartItems };
    })
  }

  const handleRemoveFromCart = (e, product) => {

    setState(state => {
      const cartItems = state.cartItems.filter(item => item.id !== product.id)
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cartItems: cartItems };
    })
  }

  const handleChangeSize = (e) => {
    setState({ ...state, size: e.target.value });
    listProducts();
  }

  const handleChangeSort = (e) => {
    setState({ ...state, sort: e.target.value });
    listProducts();
  }

  const clearCart = () => {

    alert('thank you from buying');
    localStorage.clear();
    setState({
      ...state,
      cartItems: []
    })
  }

  return (
    <div>
      <nav>
        <div className="container">
          <ul >
            <li className="navbar-left"><a href="#1">Shopping Cart</a></li>
            <li className="navbar-left"><a href="https://github.com/yanivaytegev/shopping-cart">Source Code</a></li>
            <li className="navbar-left"><a href="https://protfolio-ya-cv.web.app/">My Protfolio</a></li>
            <li className="navbar-right"><a href="#cart" id="btnCart"><i className="fa fa-shopping-cart"></i> Cart <span className="badge">{state.cartItems.length}</span></a></li>
          </ul>
        </div>
      </nav>
      <div className="container">
        <Cart count={state.cartItems.length} cartItems={state.cartItems} handleRemoveFromCart={handleRemoveFromCart} clearCart={clearCart} />
        <div className='row'>
          <Filter count={state.filteredProducts.length} size={state.size} sort={state.sort} handleChangeSize={handleChangeSize} handleChangeSort={handleChangeSort} />
          <hr />
          <Products products={state.filteredProducts} handleAddToCart={handleAddToCart} />
        </div>
      </div>
    </div>
  );

}

export default App;

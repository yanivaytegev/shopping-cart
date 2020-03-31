import React, { useState, useEffect } from 'react';
import './App.css';
import Products from './components/Products'
import Filter from './components/Filter';
import Cart from './components/Cart';
import { products } from './db.json'



function App() {
  const [state, setState] = useState({
    products: [],
    filteredProducts: [],
    load: true,
    size: '',
    sort: '',
    cartItems: [],
    display: null
  })


  useEffect(() => {

    if (state.load) {
      let ls = localStorage.getItem('cartItems')
      if (ls === null) {
        ls = '[]';
      }
      setState({
        ...state,
        products: products,
        filteredProducts: products,
        load: false,
        cartItems: JSON.parse(ls),
      })
    }
  }, [state])



  const onClickCart = (e) => {
    e.preventDefault();

    if (!state.display) state.display = { display: 'block' }
    else state.display = null

    setState({
      ...state,
      load: !state.modal
    })

  }

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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a href="#home">Shopping Cart</a>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <a className='nav-link' href="https://github.com/yanivaytegev/shopping-cart">Source Code</a>
            </li>
            <li className="nav-item">
              <a className='nav-link' href="https://protfolio-ya-cv.web.app/">My Protfolio</a>
            </li>
            <li className="nav-item active">
            </li>
          </ul>
          <span className="form-inline my-2 my-lg-0">
            <a href="#cart" id="btnCart" onClick={e => onClickCart(e)}><i className="fa fa-shopping-cart"></i> Cart <span className="badge">{state.cartItems.length}</span></a>
          </span>
        </div>
      </nav>
      <hr />
      <div className="container">
        <Cart display={state.display} count={state.cartItems.length} cartItems={state.cartItems} handleRemoveFromCart={handleRemoveFromCart} clearCart={clearCart} />
        <div className='row'>
          <Filter count={state.filteredProducts.length} size={state.size} sort={state.sort} handleChangeSize={handleChangeSize} handleChangeSort={handleChangeSort} />
          <hr />
          <Products products={state.filteredProducts} handleAddToCart={handleAddToCart} />
        </div>
      </div>
    </div >
  );

}

export default App;

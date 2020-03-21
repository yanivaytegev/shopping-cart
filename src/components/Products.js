import React, { Component } from 'react'
import util from '../util'
export default class Products extends Component {

    render() {

        const productItems = this.props.products.map(product => (
            <div className="col-sm-4" key={product.id}>
                <div className="card mt-4 mb-4">
                    <div className="image-css">
                        <img src={`products/${product.sku}_1.jpg`} alt={product.title} className="card-img-top" />
                        <i className="fa fa-heart" aria-hidden="true"></i>
                    </div>
                    <div className="card-body">
                        <a href={`#${product.id}`} className="my-link" onClick={(e) => this.props.handleAddToCart(e, product)}>add to cart</a>
                        <hr />
                        <h2>{product.title}</h2>
                        <b className="btn btn-danger">{util.formatCurrency(product.price)}</b>
                    </div>
                </div>
            </div>
        ))

        return (
            <div className='row'>
                {productItems}
            </div>
        )
    }
}

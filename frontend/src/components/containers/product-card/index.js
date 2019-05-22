import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card,
  CardImg,
  CardBody,
  Button,
  CardSubtitle,
  CardTitle } from 'reactstrap';

import * as ActionsCart from '../../../store/actions/cart';

import photo from '../../../services/photo-random';
import './style.css';

const ProductCard = ({ product, addProductToCart }) => {
  return (
    <li className="m-4">
      <Card className="card-item">
        <CardImg width="100%" src={photo(product.id)} alt="Card image cap" />
        <CardBody>
          <CardTitle>{product.name}</CardTitle>
          <CardSubtitle>R$ {typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</CardSubtitle>
          <div className="d-flex justify-content-between align-items-center">
            <Link to={`/product/${product.id}/detail`}>Detalhes</Link>
            <Button onClick={() => addProductToCart({ ...product, qty: 1 })}>Adicionar</Button>
          </div>
        </CardBody>
      </Card>
    </li>
  )
}

const mapStateToProps = (state, ownProps) => ({
  product: ownProps
})

const mapDispatchToProps = dispatch => ({
  addProductToCart: product => dispatch(ActionsCart.addProductToCart(product)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);

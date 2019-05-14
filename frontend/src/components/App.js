import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import store from '../store';

import Header from './shared/Header';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';

import './App.css';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Header/>
        <Container>
            <Route exact path='/' component={ProductList} />
            <Route exact path='/product/:id/detail' component={ProductDetail} />
        </Container>
      </Provider>
    </Router>
  );
}

export default App;

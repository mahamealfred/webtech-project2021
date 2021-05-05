import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import OrderListResult from "src/components/order/OrderListResult";
import ProductListToolbar from "src/components/product/ProductListToolbar";
import customers from "src/__mocks__/customers";
import { getProductsAction } from "../redux/actions/productsAction";
import {getOrdersAction} from '../redux/actions/getorderAction';
import { connect } from 'react-redux'
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';


const OrderList =()=> {

  const dispatch = useDispatch();

  
  useEffect(() => {
   dispatch(getOrdersAction())
  }, []);
  return (
    <div>
    
      
      <OrderListResult />
    </div>
  )
}

export default OrderList




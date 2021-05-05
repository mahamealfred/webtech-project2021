import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import ProductListResult from "src/components/product/ProductListResult";
import ProductListToolbar from "src/components/product/ProductListToolbar";
import customers from "src/__mocks__/customers";
import { getProductsAction } from "../redux/actions/productsAction";
import { connect } from 'react-redux'

class ProductList extends Component {
  componentDidMount() {
    this.props.getProductsAction();
  }
  render() {
    return (
      <>
        <Helmet>
          <title>Product </title>
        </Helmet>
        <Box
          sx={{
            backgroundColor: "background.default",
            minHeight: "100%",
            py: 3,
          }}
        >
          <Container maxWidth={false}>
            <ProductListToolbar />
            <Box sx={{ pt: 3 }}>
              <ProductListResult />
            </Box>
          </Container>
        </Box>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductsAction: () => dispatch(getProductsAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
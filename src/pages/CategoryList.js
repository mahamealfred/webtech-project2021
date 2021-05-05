import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import CustomerListResults from "src/components/customer/CustomerListResults";
import CustomerListToolbar from "src/components/customer/CustomerListToolbar";
import customers from "src/__mocks__/customers";
import { getCategoriesAction } from "../redux/actions/categoriesAction";
import { connect } from 'react-redux'

class CategoryList extends Component {
  componentDidMount() {
    this.props.getCategoriesAction();
  }
  render() {
    return (
      <>
        <Helmet>
          <title>Category </title>
        </Helmet>
        <Box
          sx={{
            backgroundColor: "background.default",
            minHeight: "100%",
            py: 3,
          }}
        >
          <Container maxWidth={false}>
            <CustomerListToolbar />
            <Box sx={{ pt: 3 }}>
              <CustomerListResults />
            </Box>
          </Container>
        </Box>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.category,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoriesAction: () => dispatch(getCategoriesAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
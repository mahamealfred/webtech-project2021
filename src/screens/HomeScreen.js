import { useState, useEffect } from "react";
import ProductComponent from "./ProductScreen";
import { useSelector, useDispatch } from "react-redux";
import { getProductsAction } from "../redux/actions/productsAction";

const HomeScreen = () => {
  const productsState = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  const get = async () => {
    await dispatch(getProductsAction());
  };

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    if (!productsState.loading) {
      if (productsState.products) {
        setProducts(productsState.products);
      }
    }
  }, [productsState.products]);
  return (
    <div
      style={{
        display: "flex",
        flexdirection: "row",
        flexWrap: "wrap",
        marginTop: "35px",
      }}
    >
      {products.length > 0 ? products.map((row) => <ProductComponent data={row}  />) : null}
    </div>
  );
};

export default HomeScreen;

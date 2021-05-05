import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import { orderAction } from "../redux/actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  useLocation,
  useNavigate,
} from "react-router-dom";
import queryString from "query-string";
import jwt from "jsonwebtoken";
import { Link } from "react-router-dom";
import "./CartScreen.css";

const CartScreen = (props) => {
  let location = useLocation();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;
  const productId = queryString.parse(location.search).id;

  const qty = 1;
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);
  const decode = (token) => {
    const JWT_SECRET = "mahame123";
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
  };
  const checkoutHandler = () => {
    const token = localStorage.getItem("my-token");
    if (token) {
      const { exp } = decode(token);
      console.log(navigate);
      if (Date.now() >= exp * 1000) {
        return navigate("/login?redirect=shipping");
      }
      dispatch(orderAction(cartItems,navigateFunction));
    } else {
      navigate("/login?redirect=shipping");
    }
  };
const navigateFunction=()=>{
  navigate("/");

}


  const numberWithCommas=(x)=>{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
  }

  return (
    <div class="shopping-cart">
      <div>
        <h1>Shopping Cart</h1>
        <br /> <br /> <br />
        <div>
          <div class="column-labels">
            <label class="product-image">Image</label>
            <label class="product-details">Product</label>
            <label class="product-price">Price</label>
            <label class="product-quantity">Quantity</label>
            <label class="product-removal">Remove</label>
            <label class="product-line-price">Total</label>
          </div>

          {cartItems.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            cartItems.map((item) => (
              <div>
                <div class="product">
                  <div class="product-image">
                    <img src={`../static/images/products/${item.imageUrl}`} />
                  </div>
                  <div class="product-details">
                    <div class="product-title">{item.name}</div>
                    <p class="product-description">{item.description}</p>
                  </div>
                  <div class="product-price">{numberWithCommas(item.price)}</div>
                  <div class="product-quantity">
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, e.target.value))
                      }
                    >
                      {[...Array(item.quantity).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div class="product-removal">
                    <button
                      class="remove-product"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Remove
                    </button>
                  </div>
                  <div class="product-line-price">
                    {numberWithCommas(item.qty ? item.price * item.qty : item.price)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div class="totals">
        <div class="totals-item totals-item-total">
          <label>Grand Total</label>
          <div class="totals-value" id="cart-total">
            ( {cartItems.reduce((a, c) => Number(a) + Number(c.qty), 0)} items) : RWF {" "}
            {numberWithCommas(cartItems.reduce((a, c) => a + c.price * c.qty, 0))}
          </div>
        </div>
        <button class="checkout" onClick={() => checkoutHandler()}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartScreen;

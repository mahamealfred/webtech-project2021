import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import signupReducer from "./signupReducer";
import categoryReducer from "./categoriesReducer";
import deleteCategoryReducer from "./deleteCategoryReducer";
import deleteProductReducer from "./deleteProductReducer";
import productReducer from "./productReducer";
import addCategoryReducer from "./addCategoryReducer";
import updateCategoryReducer from "./updateCategoryReducer";
import addProductReducer from "./addProductReducer";
import updateProductReducer from "./updateProductReducer";
import { cartReducer } from "./cartReducer";
import orderReducer from "./orderReducer";
import usersReducer from "./usersReducer";
import deleteUsers from "./deleteUserReducer";
import getorderReducer from    "./getorderReducer"
import deleteOrderReducer from "./deleteOrderReducer"

const allReducers = combineReducers({
  login: loginReducer,
  signup: signupReducer,
  categories: categoryReducer,
  deleteCategories: deleteCategoryReducer,
  products: productReducer,
  deleteProducts: deleteProductReducer,
  addCategory: addCategoryReducer,
  updateCategory: updateCategoryReducer,
  addProduct: addProductReducer,
  updateProduct: updateProductReducer,
  cart: cartReducer,
  order: orderReducer,
  users: usersReducer,
  deleteUsers:deleteProductReducer,
  orders: getorderReducer,
  deleteOrder:deleteOrderReducer
});

export default allReducers;

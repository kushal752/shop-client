import { loginFailure, loginStart, loginSuccess, LogoutSuccess, SignInSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import { addProduct, CartLogout, deleteItemCart, errorStart, InitCart, loadingStart } from "./cartRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    let total = 0;
    let q = 0;
    res.data.products.map((e) => {
      total += (e.prodprice * e.quantity);
      q++;
    })
    dispatch(InitCart({ productarray: res.data.products, total, q }));
    // dispatch(InitCart(res.data.products));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logout = (dispatch) => {
  try {
    dispatch(LogoutSuccess());
    dispatch(CartLogout());
  }
  catch (err) {
    console.log(err);
  }
}

export const signin = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(SignInSuccess(res.data));
  }
  catch {
    dispatch(loginFailure());
  }
}

export const Addtocart = async (dispatch, user, productod) => {
  dispatch(loadingStart());
  try {
    const res = await userRequest.put(`/users/${user._id}`, user);
    console.log(res.data);
    dispatch(addProduct(productod));
  }
  catch (err) {
    console.log(err);
    dispatch(errorStart());
  }
}

export const removeFromCart = async (dispatch, user, productarray, total) => {
  dispatch(loadingStart());
  try {
    const res = await userRequest.put(`/users/${user._id}`, user);
    console.log(res.data);
    let total = 0;
    let q = 0;
    productarray.map((e) => {
      total += (e.prodprice * e.quantity);
      q++;
    })
    // let num = 0;
    // productarray.map((e) => {
    //   num++;
    // })
    dispatch(deleteItemCart({ productarray, total, q }));
  }
  catch (err) {
    console.log(err);
    dispatch(errorStart());
  }
}

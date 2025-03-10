import axios from "axios";

const baseUrl = import.meta.env.VITE_API_API_URL;

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = true; // Để gửi cookie (csrftoken, sessionid)
axios.defaults.xsrfCookieName = "csrftoken"; // Tên cookie chứa CSRF token
axios.defaults.xsrfHeaderName = "X-CSRFToken"; // Header gửi CSRF token

// Tùy chỉnh interceptors để log lỗi
// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error('API Error:', error.response?.data || error.message)
//     return Promise.reject(error)
//   }
// )

// ---------- crud function ----------
const readFunc = (data) => {
  return axios.get("/api/order", { params: data });
};
const createFunc = (data) => {
  return axios.post("/api/order", data);
};
const updateFunc = (data) => {
  return axios.put("/api/order", data);
};
const deleteFunc = (id) => {
  return axios.delete("/api/order", { params: { id } });
};

// ---------- login ----------
const loginUser = ({ username, password }) => {
  return axios.post("/api/auth/login/", { username, password });
};
const loginGoogleToken = ({ id_token }) => {
  return axios.post("/api/auth/login/google/", { id_token });
};
const logoutUser = () => {
  return axios.post("/api/auth/logout/");
};
const checkSessionUser = () => {
  return axios.get("/api/auth/check-user/");
};

// ---------- loai san pham ----------
const readLoaiSanPham = (data) => {
  return axios.get("/api/category/", { params: data });
};
const readSanPham = (data) => {
  return axios.get("/api/product/", { params: data });
};

// ---------- cart ----------
const readGioHang = (data) => {
  return axios.get("/api/cart/my-cart/", { params: data });
};
const createAddGioHang = (data) => {
  return axios.post("/api/cart/add-to-cart/", data);
};
const removeProduct = (data) => {
  return axios.delete("/api/cart/remove-product/", { data: data });
};
const updateQuantityItemCart = (data) => {
  return axios.post("/api/cart/update-quantity/", data);
};

// ---------- cart ----------
const readOrder = () => {
  return axios.get("/api/invoice/my-hoa-don/");
};
const createOrder = (data) => {
  return axios.post("/api/invoice/tao-hoa-don-tu-hour-hang/", data);
};
const updateStatusOrder = (data) => {
  return axios.post("/api/invoice/update-hoa-don/", data);
};

// ---------- nạp tiền ----------
const readBuyTime = () => {
  return axios.get("/api/customer-deposits/");
};
const createBuyTime = (data) => {
  return axios.post("/api/customer-deposits/request-deposit/", data);
};


const checkRemainingTime = (data) => {
  return axios.post("/api/auth/check-remaining-time/", data);
};

export {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
  loginUser,
  logoutUser,
  checkSessionUser,
  readLoaiSanPham,
  readSanPham,
  readGioHang,
  createAddGioHang,
  removeProduct,
  updateQuantityItemCart,
  loginGoogleToken,
  createOrder,
  readOrder,
  updateStatusOrder,
  createBuyTime,
  readBuyTime, checkRemainingTime
};
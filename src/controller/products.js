import axios from "axios";

const productsController = {
  async getProducts() {
    return await axios.get("http://localhost:3000/products");
  },

  async getProduct(id) {
    return await axios.get(`http://localhost:3000/products/${id}`);
  },

  async createProduct(product) {
    return await axios.post("http://localhost:3000/products", product);
  },

  async updateProduct(id, product) {
    return await axios.put(`http://localhost:3000/products/${id}`, product);
  },

  async deleteProduct(id) {
    return await axios.delete(`http://localhost:3000/products/${id}`);
  },
};

export default productsController;

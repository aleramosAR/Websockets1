// CLASE - Genero la clase "Products" para administrar el listado de productos y su logica
class ProductController {
  constructor() {
    this.PRODUCTS = [];
    this.prodID = 0;
  }

  // Devuevo el listado completo, si el listado esta vacio devuelvo false para hacer el chequeo
  getProds() {
    if (this.PRODUCTS.length == 0) {
      return false;
    }
    return this.PRODUCTS;
  }

  // Devuelvo un producto seleccionado del listado
  selectProd(id) {
    return this.PRODUCTS.filter(prod => prod.id === parseInt(id))[0];
  }

  // Agrego un producto al listado
  addProd(data) {
    if (data.title === "" || typeof data.title === "undefined") return false;
    if (data.price === "" || typeof data.price === "undefined") return false;
    if (data.thumbnail === "" || typeof data.thumbnail === "undefined") return false;
    data.id = this.prodID++;
    this.PRODUCTS.push({
      title: data.title,
      price: data.price,
      thumbnail: data.thumbnail,
      id: data.id
    });
    return true;
  }

  // Actualizo un producto
  updateProd(id, data) {
    // Chequeo que item del array tiene el mismo ID para seleccionarlo
    let index;
    for (let i = 0; i < this.PRODUCTS.length; i++) {
      if (this.PRODUCTS[i].id === id) {
        index = i;
        break;
      }
    };
    // Si el item existe lo reenmplazo.
    // Al product que recibo desde el body le agrego el ID correspondiente y lo grabo
    if (index != undefined) {
      data.id = id;
      this.PRODUCTS[index] = data;
      return data;
    };
  }

  // Elimino un producto
  deleteProd(id) {
    // Chequeo que item del array tiene el mismo ID para seleccionarlo
    let index;
    for (let i = 0; i < this.PRODUCTS.length; i++) {
      if (this.PRODUCTS[i].id === id) {
        index = i;
        break;
      }
    };
    // Si el item existe lo elimino del array.
    if (index != undefined) {
      const product = this.PRODUCTS[index];
      this.PRODUCTS.splice(index, 1);
      return product;
    };
  }
}

export default new ProductController();
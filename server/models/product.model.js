import connection from "../config/index.js";

const Product = function (product) {
  this.id = product.id;
  this.description = product.description;
  this.name = product.name;
  this.category = product.category;
  this.price = product.price;
  this.item_sold = product.item_sold;
};

const ProductImage = function (productImage) {
  this.product_id = productImage.product_id;
  this.url = productImage.url;
  this.title = productImage.title;
};

Product.create = async (newProduct) => {
  const { description, name, category, price, item_sold } = newProduct;

  return await connection.query(
    "INSERT INTO product SET description = ?, name = ?, category = ?, price = ?, item_sold = ?",
    [description, name, category, price, item_sold]
  )
    .then((result) => {
      const insertId = result[0].insertId;
      newProduct.id = insertId;
      return newProduct;
    })
    .catch((err) => {
      console.log("error: ", err);
      throw err;
    });
};



Product.update = (productId, updatedProduct) => {
  return connection.query(
    "UPDATE product SET description = ?, name = ?, category = ?, price = ?, item_sold = ? WHERE id = ?",
    [
      updatedProduct.description,
      updatedProduct.name,
      updatedProduct.category,
      updatedProduct.price,
      updatedProduct.item_sold,
      productId,
    ]
  )
    .then((res) => {
      if (res.affectedRows === 0) {
        throw { kind: "update failed!" };
      }
      return updatedProduct;
    })
    .catch((err) => {
      console.log("error: ", err);
      throw err;
    });
};

Product.delete = (productId) => {
  return connection.query("DELETE FROM product WHERE id = ?", [productId])
    .then((res) => {
      if (res.affectedRows === 0) {
        throw { kind: "not_found" };
      }
      console.log("deleted product with id: ", productId);
      return res;
    })
    .catch((err) => {
      console.log("error: ", err);
      throw err;
    });
};

ProductImage.create = (newProductImage) => {
  return connection.query("INSERT INTO product_image SET ?", newProductImage)
    .then((res) => {
      console.log("created product image: ", { product_id: res.insertId, ...newProductImage });
      return { product_id: res.insertId, ...newProductImage };
    })
    .catch((err) => {
      console.log("error: ", err);
      throw err;
    });
};

Product.find = (productId) => {
  return connection.query("SELECT * FROM product WHERE id = ?", [productId])
    .then(async (products) => {
      const productsWithImages = await Promise.all(products[0].map(async (product) => {
        const images = await connection.query('SELECT * FROM product_image WHERE product_id = ?', [product.id]);
        product.images = images[0];
        return product;
      }));
      return productsWithImages;
    })
    .catch((err) => {
      console.log('error: ', err);
      throw err;
    });
};

Product.getAll = () => {
  return connection.query('SELECT * FROM product')
    .then(async (products) => {
      const productsWithImages = await Promise.all(products[0].map(async (product) => {
        console.log(product);
        const images = await connection.query('SELECT * FROM product_image WHERE product_id = ?', [product.id]);
        product.images = images[0];
        return product;
      }));
      return productsWithImages;
    })
    .catch((err) => {
      console.log('error: ', err);
      throw err;
    });
};


ProductImage.update = (productId, updatedProductImage) => {
  return connection.query(
    "UPDATE product_image SET url = ?, title = ? WHERE product_id = ?",
    [updatedProductImage.url, updatedProductImage.title, productId]
  )
    .then((res) => {
      if (res.affectedRows === 0) {
        throw { kind: "not_found" };
      }
      console.log("updated product image: ", { product_id: productId, ...updatedProductImage });
      return { product_id: productId, ...updatedProductImage };
    })
    .catch((err) => {
      console.log("error: ", err);
      throw err;
    });
};

ProductImage.delete = (productId) => {
  return connection.query(
    "DELETE FROM product_image WHERE product_id = ?",
    [productId]
  )
    .then((res) => {
      if (res.affectedRows === 0) {
        throw { kind: "not_found" };
      }
      console.log("deleted product image with productId: ", productId);
      return { productId };
    })
    .catch((err) => {
      console.log("error: ", err);
      throw err;
    });
};

export { Product, ProductImage };
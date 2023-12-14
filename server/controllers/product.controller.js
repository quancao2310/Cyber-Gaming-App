import { Product, ProductImage } from '../models/product.model.js';

class ProductController {
  async showAll(req, res) {
    try {
      const data = await Product.getAll();
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async show(req, res) {
    try {
      const productId = req.params.productId;
      const product = await Product.find(productId);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async addProductWithImages(req, res) {
    try {
      const { name, description, category, price, item_sold, images } = req.body;

      if (!description || !name || !category || !price || !item_sold || !images || !Array.isArray(images)) {
        return res.status(400).json({ message: 'Invalid request body' });
      }

      const newProduct = new Product({ description, name, category, price, item_sold });
      const createdProduct = await Product.create(newProduct);

      console.log(createdProduct);

      const productImages = images.map(image => new ProductImage({ product_id: createdProduct.id, ...image }));
      const createdProductImages = await Promise.all(productImages.map(img => ProductImage.create(img)));

      createdProduct.images = createdProductImages;

      res.status(201).json(createdProduct);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateProductWithImages(req, res) {
    try {
      const productId = req.params.productId;
      const { name, description, category, price, item_sold, images } = req.body;
  
      await ProductImage.delete(productId);
      
      const updatedProduct = await Product.update(productId, {
        name,
        description,
        category,
        price,
        item_sold,
      });
  
      if (images && Array.isArray(images) && images.length > 0) {
        const productImages = images.map((image) => new ProductImage({
          product_id: productId,
          ...image,
        }));
  
        await Promise.all(productImages.map((img) => ProductImage.create(img)));
      }
  
      res.status(200).json({ message: 'Product and associated images updated successfully', updatedProduct });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

  async deleteProductWithImages(req, res) {
    try {
      const productId = req.params.productId;
      
      await Product.delete(productId);
  
      res.status(200).json({ message: 'Product and associated images deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new ProductController();
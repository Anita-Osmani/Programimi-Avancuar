const request = require('supertest');
const app = require('../../src/app');

describe('Product API Routes', () => {
  // Valid API key for tests
  const validApiKey = 'test-api-key';

  // Sample product to use in tests
  const sampleProduct = {
    name: 'Smart Watch',
    price: 199.99,
    category: 'electronics',
    stockCount: 15,
  };

  let createdProductId; // To store the ID of the created product

  // Test suite for GET /api/products
  describe('GET /api/products', () => {
    it('should return 401 if no API key is provided', async () => {
      const res = await request(app).get('/api/products');
      expect(res.statusCode).toEqual(401);
    });

    it('should return a list of products with valid API key', async () => {
      const res = await request(app)
        .get('/api/products')
        .set('X-API-Key', validApiKey);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('products');
      expect(Array.isArray(res.body.products)).toBe(true);
    });

    it('should filter products by category', async () => {
      const res = await request(app)
        .get('/api/products?category=electronics')
        .set('X-API-Key', validApiKey);

      expect(res.statusCode).toEqual(200);
      expect(res.body.products.every(product => product.category === 'electronics')).toBe(true);
    });

    it('should filter products by inStock status', async () => {
      const res = await request(app)
        .get('/api/products?inStock=true')
        .set('X-API-Key', validApiKey);

      expect(res.statusCode).toEqual(200);
      expect(res.body.products.every(product => product.stockCount > 0)).toBe(true);
    });
  });

  // Test suite for POST /api/products
  describe('POST /api/products', () => {
    it('should create a new product with valid data', async () => {
      const res = await request(app)
        .post('/api/products')
        .set('X-API-Key', validApiKey)
        .send(sampleProduct);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toEqual(sampleProduct.name);
      expect(res.body.price).toEqual(sampleProduct.price);
      expect(res.body.category).toEqual(sampleProduct.category);
      expect(res.body.stockCount).toEqual(sampleProduct.stockCount);

      // Save the created product ID for later tests
      createdProductId = res.body.id;
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app)
        .post('/api/products')
        .set('X-API-Key', validApiKey)
        .send({});

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  // Test suite for PUT /api/products/:id
  describe('PUT /api/products/:id', () => {
    it('should update an existing product with valid data', async () => {
      const updatedData = {
        price: 179.99,
        stockCount: 10,
      };

      const res = await request(app)
        .put(`/api/products/${createdProductId}`)
        .set('X-API-Key', validApiKey)
        .send(updatedData);

      expect(res.statusCode).toEqual(200);
      expect(res.body.price).toEqual(updatedData.price);
      expect(res.body.stockCount).toEqual(updatedData.stockCount);
    });

    it('should return 404 if the product does not exist', async () => {
      const res = await request(app)
        .put('/api/products/9999')
        .set('X-API-Key', validApiKey)
        .send({ price: 100 });

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('error');
    });
  });

  // Test suite for DELETE /api/products/:id
  describe('DELETE /api/products/:id', () => {
    it('should delete an existing product', async () => {
      const res = await request(app)
        .delete(`/api/products/${createdProductId}`)
        .set('X-API-Key', validApiKey);

      // Adjust the expected status code based on your server implementation
      if (res.statusCode === 204) {
        // If the server returns 204 No Content
        expect(res.body).toEqual({});
      } else if (res.statusCode === 200) {
        // If the server returns 200 OK
        expect(res.body).toHaveProperty('message', 'Product deleted successfully');
      } else {
        // Fail the test if neither 204 nor 200 is returned
        throw new Error(`Unexpected status code: ${res.statusCode}`);
      }

      // Ensure the status code is either 200 or 204
      expect([200, 204]).toContain(res.statusCode);
    });

    it('should return 404 if the product does not exist', async () => {
      const res = await request(app)
        .delete('/api/products/9999')
        .set('X-API-Key', validApiKey);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('error');
    });
  });
});
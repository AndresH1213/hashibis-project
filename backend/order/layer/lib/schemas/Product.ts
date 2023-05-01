export default class Product {
  static getSchema() {
    return {
      type: 'object',
      properties: {
        productId: {
          type: 'string',
          description: 'Product ID',
        },
        price: {
          type: 'number',
          description: 'Price of the product at the time the order was placed',
          minimum: 0,
        },
        quantity: {
          type: 'number',
          description: 'Quantity of the product ordered',
          minimum: 1,
        },
      },
      required: ['productId', 'price', 'quantity'],
    } as const;
  }
}

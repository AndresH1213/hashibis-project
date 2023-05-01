import Product from './Product';
import Shipping from './Shipping';

export default class Order {
  static getSchema() {
    return {
      type: 'object',
      properties: {
        date: {
          type: 'string',
          format: 'date-time',
          description: 'Date and time when the order was placed',
        },
        products: {
          type: 'array',
          minItems: 1,
          items: Product.getSchema(),
          description: 'List of products that were ordered',
        },
        total: {
          type: 'number',
          description: 'Total cost of the order',
          minimum: 0,
        },
        status: {
          type: 'string',
          description: 'Current status of the order',
          enum: ['pending', 'in progress', 'delivered', 'cancelled'],
        },
        shipping: Shipping.getSchema(),
        trackingNumber: {
          type: 'string',
          description: 'Tracking number or identifier for the shipping order',
        },
        comments: {
          type: 'string',
          description: 'Any additional comments or instructions from the user',
        },
      },
      required: ['date', 'products', 'total', 'status', 'shipping'],
    } as const;
  }
}

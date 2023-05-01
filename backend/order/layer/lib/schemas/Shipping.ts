export default class Order {
  static getSchema() {
    return {
      type: 'object',
      description: 'Shipping information for the order',
      properties: {
        address: {
          type: 'string',
          description: 'Date and time when the order was placed',
        },
        date: {
          type: 'string',
          format: 'date-time',
          description:
            'Date when the order was shipped (if different from the order date)',
        },
        method: {
          type: 'string',
          description: 'Shipping method used to deliver the order',
          enum: ['mail', 'courier', 'in-person delivery'],
        },
      },
      required: ['address', 'date', 'method'],
    } as const;
  }
}

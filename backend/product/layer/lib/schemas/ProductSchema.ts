export default class ProductSchema {
  static getSchema() {
    return {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          minLength: 4,
          description: 'Name of the product',
        },
        description: {
          type: 'string',
          description: 'Description of the product',
        },
        code: {
          type: 'string',
          minLength: 3,
          description: 'Code of the product',
        },
        category: {
          type: 'string',
          description: 'Category of the product',
          enum: [
            'Flower/Bud',
            'Edibles',
            'Concentrates',
            'Topicals',
            'Vapes',
            'Accessories',
            'Growing Supplies',
            'Apparel and Merchandise',
          ],
        },
        concentration: {
          type: 'number',
          min: 0,
          description: 'Concentration of cannabinoids per serving or per ml',
        },
        measureUnitConcentration: {
          type: 'string',
          description:
            'Unit of measure of the concentration of the product, ml or portion',
        },
        tags: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'List of tags related to the product',
        },
        benefits: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'List of benefits related to the product',
        },
        price: {
          type: 'number',
          description: 'Price of the product',
        },
        images: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'List of url images of the products',
        },
        personalDosis: {
          type: 'string',
          description:
            'Allow the customer to know how much to consume per serving, helping them avoid overdose or excessive consumption.',
        },
        recommendation: {
          type: 'string',
          description: 'Recommendation to consume the product',
        },
        scientificResearch: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'List of scientific research related to the product',
        },
      },
      required: ['name', 'code', 'description', 'category', 'price'],
    } as const;
  }
}

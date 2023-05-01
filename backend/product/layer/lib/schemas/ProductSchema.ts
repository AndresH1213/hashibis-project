export default class ProductSchema {
  static getSchema() {
    return {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          minLength: 1,
          description: 'Name of the product being offered for sale',
        },
        type: {
          type: 'string',
          description: 'Type of the product being offered for sale',
          enum: ['flower', 'cream', 'edible', 'topical', 'vape', 'extract'],
        },
        cannabinoidContent: {
          type: 'string',
          description:
            'Amount of THC, CBD, and other cannabinoids found in the product',
        },
        concentration: {
          type: 'string',
          description: 'Concentration of cannabinoids per serving or per ml',
        },
        measureUnitConcentration: {
          type: 'string',
          enum: ['ml', 'portion'],
          description:
            'Unit of measure of the concentration of the product, ml or portion',
        },
        extractionMethod: {
          type: 'string',
          description: 'Method of extraction of the product',
          enum: ['CO2', 'butane', 'ethanol', 'solventless'],
        },
        origin: {
          type: 'string',
          description:
            'Variety of the cannabis from which the cannabinoids from the cannabis',
          enum: ['indica', 'sativa', 'hybrid'],
        },
        presentation: {
          type: 'string',
          description:
            'The form in which the product is presented (e.g. bottle, tube, vaporizer).',
          enum: ['bottle', 'tube', 'vaporizer'],
        },
        price: {
          type: 'number',
          description: 'Price of the product',
        },
        effects: {
          type: 'string',
          description:
            'Description of the effects of the product on the body and mind',
        },
        family: {
          type: 'string',
          description:
            'which family of cannabinoids the product belongs to (e.g. THC, CBD, CBN, CBG).',
          enum: ['THC', 'CBD', 'CBN', 'CBG'],
        },
        recommendedPersonalDose: {
          type: 'string',
          description:
            'Allow the customer to know how much to consume per serving, helping them avoid overdose or excessive consumption.',
        },
        scientificResearch: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'List of scientific research related to the product',
        },
      },
      required: [
        'name',
        'type',
        'cannabinoidContent',
        'origin',
        'presentation',
        'price',
        'effects',
        'family',
        'recommendedPersonalDose',
      ],
    } as const;
  }
}

export default class PersonalInformation {
  static getSchema() {
    return {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          minLength: 1,
          description: 'Name of the person',
        },
        lastname: {
          type: 'string',
          minLength: 1,
          description: 'Lastname of the person',
        },
        birthday: {
          type: 'string',
          format: 'date',
          description: 'Birthday of the person, to verify the customers age',
        },
        address: {
          type: 'string',
          description: 'Address of the person',
        },
        identification: {
          type: 'string',
          description:
            'Identification of the person, ensure that are on duplicates or frauds',
        },
        identificationType: {
          type: 'string',
          description: 'Type of identification of the person',
          enum: ['CC', 'PA', 'NIT'],
        },
        gender: {
          type: 'string',
          description: 'Gender of the person',
          enum: ['male', 'female', 'other'],
        },
        phone: {
          type: 'string',
          pattern: '^\\+\\d{5,16}$',
          description: 'Phone of the person',
        },
        hasMedicalHistory: {
          type: 'boolean',
          default: false,
          description: 'Indicates if the person has a medical history',
        },
        lastOrder: {
          type: 'string',
          description: 'Date of the last order of the person',
          format: 'date',
        },
        ordersNumber: {
          type: 'number',
          description: 'Number of orders of the person',
          default: 0,
        },
      },
      required: ['name', 'lastname', 'birthday'],
    } as const;
  }
}

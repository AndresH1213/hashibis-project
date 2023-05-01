export default class MedicalHistory {
  static getSchema() {
    return {
      type: 'object',
      description: 'Medical history of the client',
      properties: {
        allergies: {
          type: 'string',
          description: 'Record any allergies the client may have',
        },
        chronicIllnesses: {
          type: 'string',
          description:
            'Record any chronic illnesses the client has, such as diabetes, asthma, heart disease, autoimmune diseases, etc. This is important because certain cannabis products may interact with medications used to treat these illnesses, and dosage adjustments may be necessary',
        },
        prescriptionMedication: {
          type: 'string',
          description:
            'Record any prescription medication the client is taking, as some medications may interact with components of marijuana, which can affect their efficacy or cause unwanted side effects',
        },
        drugsUseHistory: {
          type: 'string',
          description:
            'Record any drug use history, as this may indicate a higher tolerance to the effects of marijuana, which can affect the necessary dosage to achieve desired effects',
        },
        psychiatricIssues: {
          type: 'string',
          description:
            "Record any psychiatric issues the client may have, such as anxiety, depression, sleep disorders, etc. This is important because certain cannabis products can affect a person's mood and sleep, and dosage adjustments may be necessary.",
        },
        isPregnancyOrLactation: {
          type: 'boolean',
          description:
            'Record whether the client is pregnant or breastfeeding, as marijuana can affect fetal development and lactation',
        },
      },
      required: ['allergies', 'chronicIllnesses'],
    } as const;
  }
}

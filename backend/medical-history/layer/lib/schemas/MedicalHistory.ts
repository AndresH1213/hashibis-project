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
            'Record any chronic illnesses the client has, such as diabetes, asthma, heart disease, autoimmune diseases',
        },
        prescriptionMedication: {
          type: 'string',
          description:
            'Record any prescription medication the client is taking',
        },
        //
        previousExperienceWithTHC: {
          type: 'string',
          description:
            'Record previous experience with cannabis if any, which can affect the necessary dosage to achieve desired effects',
        },
        frequenceOfUsage: {
          type: 'string',
          enum: ['ocassional', 'regular', 'daily'],
          description: 'Frequency of cannabis usage',
        },
        effectsExperienced: {
          type: 'string',
          description: 'any positive or negative effects experienced',
        },
        //
        psychiatricIssues: {
          type: 'string',
          description:
            "Record any psychiatric issues the client may have, such as anxiety, depression, sleep disorders, etc. This is important because certain cannabis products can affect a person's mood and sleep, and dosage adjustments may be necessary.",
        },
        historyOfAbuse: {
          type: 'string',
          description: 'History of substance abuse or addiction',
        },
        mentalHealthMedications: {
          type: 'string',
          description: 'Mental Health medication (if any)',
        },
      },
      required: [],
    } as const;
  }
}

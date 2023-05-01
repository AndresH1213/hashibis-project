import { FromSchema } from 'json-schema-to-ts';
import MedicalHistorySch from '../lib/schemas/MedicalHistory';

const MedicalHistorySchema = MedicalHistorySch.getSchema();
export type IMedicalHistory = FromSchema<typeof MedicalHistorySchema>;
export interface MedicalHistoryProps extends Partial<IMedicalHistory> {
  userId: string;
}

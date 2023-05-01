import { FromSchema } from 'json-schema-to-ts';
import PersonalInformationSch from '../lib/schemas/PersonalInformation';

const PersonalInformationSchema = PersonalInformationSch.getSchema();
export type IPersonalInformation = FromSchema<typeof PersonalInformationSchema>;
export interface PersonalInformationProps
  extends Partial<IPersonalInformation> {
  userId: string;
}

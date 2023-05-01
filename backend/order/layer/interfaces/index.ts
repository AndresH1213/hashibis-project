import { FromSchema } from 'json-schema-to-ts';
import OrderSch from '../lib/schemas/Order';

const OrderSchema = OrderSch.getSchema();
export type IOrder = FromSchema<typeof OrderSchema>;

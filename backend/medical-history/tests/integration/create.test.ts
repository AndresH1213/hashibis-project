import { handler as handlerCreate } from '@/src/create';
import medical_history_body from '@/../tests_config/data/medical_history.json';

jest.mock('@/layer/models/MedicalHistory');
const restParams: [any, any] = [{} as any, () => {}];
const paramBody = { body: JSON.stringify(medical_history_body) };
const getSuccessParams = (): [any, any, any] => [paramBody, ...restParams];
const getFailedParams = (): [any, any, any] => [
  { body: { requenceOfUsage: 'random' } },
  ...restParams,
];

describe('Suite for test the lambda for create medical history', function () {
  it('test the object for success response', async () => {
    const res = await handlerCreate(...getSuccessParams());
    if (!res) throw new Error('No response');
    const body = JSON.parse(res.body);
    expect(body.item).toEqual(
      expect.objectContaining({
        allergies: expect.any(String),
        chronicIllnesses: expect.any(String),
      })
    );
  });

  it('test the message for success response', async () => {
    const res = await handlerCreate(...getSuccessParams());
    if (!res) throw new Error('No response');
    const body = JSON.parse(res.body);
    expect(body.message).toEqual('Medical History created successfully');
  });

  it('test errors array in the response', async () => {
    const res = await handlerCreate(...getFailedParams());
    console.log('res', res);
    if (!res) throw new Error('No response');
    const body = JSON.parse(res.body);
    expect(body.errors).toBeInstanceOf(Array);
  });

  it('test first object in error array in the response response', async () => {
    const res = await handlerCreate(...getFailedParams());
    if (!res) throw new Error('No response');
    const body = JSON.parse(res.body);
    const error = body.errors[0];
    expect(error).toEqual(
      expect.objectContaining({
        message: expect.any(String),
      })
    );
  });
});

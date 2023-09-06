import { handler as handlerCreate } from '@/src/create-personal-information';
import personal_information_body from '@/../tests_config/data/personal_information.json';

jest.mock('@/layer/models/PersonalInformation');
const restParams: [any, any] = [{} as any, () => {}];
const paramBody = { body: JSON.stringify(personal_information_body) };
const getSuccessParams = (): [any, any, any] => [paramBody, ...restParams];
const getFailedParams = (): [any, any, any] => [{}, ...restParams];

describe('Suite for test the lambda for personal information', function () {
  it('test the object for success response', async () => {
    const res = await handlerCreate(...getSuccessParams());
    if (!res) throw new Error('No response');
    console.log({ res });
    const body = JSON.parse(res.body);
    expect(body.item).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        lastname: expect.any(String),
        address: expect.any(String),
        birthday: expect.any(String),
        gender: expect.any(String),
        hasMedicalHistory: expect.any(Boolean),
        phone: expect.any(String),
        identification: expect.any(String),
        identificationType: expect.any(String),
        lastOrder: expect.any(String),
        ordersNumber: expect.any(Number),
        userId: expect.any(String),
      })
    );
  });

  it('test the message for success response', async () => {
    const res = await handlerCreate(...getSuccessParams());
    if (!res) throw new Error('No response');
    const body = JSON.parse(res.body);
    expect(body.message).toEqual('Personal Information created successfully');
  });

  it('test errors array in the response', async () => {
    const res = await handlerCreate(...getFailedParams());
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

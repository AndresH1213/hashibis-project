import { handler as handlerCreate } from '@/src/create';
import create_order_body from '@/../tests_config/data/create_order.json';

jest.mock('@/layer/models/Order');
const restParams: [any, any] = [{} as any, () => {}];
const paramBody = { body: JSON.stringify(create_order_body) };
const getSuccessParams = (): [any, any, any] => [paramBody, ...restParams];
const getFailedParams = (): [any, any, any] => [{}, ...restParams];

describe('Suite for test the lambda for create order', function () {
  it('test the object for success response', async () => {
    const res = await handlerCreate(...getSuccessParams());
    if (!res) throw new Error('No response');
    const body = JSON.parse(res.body);
    expect(body.item).toEqual(
      expect.objectContaining({
        date: expect.any(String),
        total: expect.any(Number),
        userId: expect.any(String),
        status: expect.any(String),
      })
    );
  });

  it('test the message for success response', async () => {
    const res = await handlerCreate(...getSuccessParams());
    if (!res) throw new Error('No response');
    const body = JSON.parse(res.body);
    expect(body.message).toEqual('Order created successfully');
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

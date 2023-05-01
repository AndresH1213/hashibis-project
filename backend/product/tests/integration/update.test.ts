import { handler as handlerUpdate } from '@/src/update-product';
import ValidationException from '/opt/nodejs/exceptions/ValidationException';

jest.mock('@/layer/models/Product');
const restParams: [any, any] = [{} as any, () => {}];
const paramBody = { body: JSON.stringify({ name: 'CBD new product' }) };
const getSuccessParams = (): [any, any, any] => [paramBody, ...restParams];
const getFailedParams = (): [any, any, any] => [{}, ...restParams];

describe('Suite for test the lambda for update product', function () {
  it('test the object for success response', async () => {
    const res = await handlerUpdate(...getSuccessParams());
    if (!res) throw new Error('No response');
    const body = JSON.parse(res.body);
    expect(body.item.name).toEqual('CBD new product');
  });

  it('test the message for success response', async () => {
    const res = await handlerUpdate(...getSuccessParams());
    if (!res) throw new Error('No response');
    const body = JSON.parse(res.body);
    expect(body.message).toEqual('Product updated successfully');
  });

  it('test first object in error array in the response response', async () => {
    let res = null;
    try {
      res = await handlerUpdate(...getFailedParams());
      if (!res) throw new Error('No response');
    } catch (error) {
      if (error instanceof ValidationException) {
        res = error;
      }
    }
    expect(res).toBeInstanceOf(ValidationException);
    expect(res.message).toBe('There is no data for update the product');
  });
});

import { handler as handlerCreate } from '@/src/create-product';
import product_body from '@/../tests_config/data/product.json';

jest.mock('@/layer/models/Product');
const restParams: [any, any] = [{} as any, () => {}];
const paramBody = { body: JSON.stringify(product_body) };
const getSuccessParams = (): [any, any, any] => [paramBody, ...restParams];
const getFailedParams = (): [any, any, any] => [{}, ...restParams];

describe('Suite for test the lambda for product', function () {
  it('test the object for success response', async () => {
    const res = await handlerCreate(...getSuccessParams());
    if (!res) throw new Error('No response');
    const body = JSON.parse(res.body);
    expect(body.item).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        type: expect.any(String),
        cannabinoidContent: expect.any(String),
      })
    );
  });

  it('test the message for success response', async () => {
    const res = await handlerCreate(...getSuccessParams());
    if (!res) throw new Error('No response');
    const body = JSON.parse(res.body);
    expect(body.message).toEqual('Product created successfully');
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

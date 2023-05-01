import { handler as handlerGetAll } from '@/src/get-all';
import Order from '@/layer/models/Order';

jest.mock('@/layer/models/Order');

const params: [any, any, any] = [{} as any, {} as any, () => {}];

describe('Suite for test the lambda for get all orders', function () {
  it('test the object for success response', async () => {
    const spy = jest.spyOn(Order, 'getAll');
    const res = await handlerGetAll(...params);
    expect(spy).toHaveBeenCalled();
    if (!res) throw new Error('No response');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();

    spy.mockRestore();
  });

  it('test the message for success response', async () => {
    const res = await handlerGetAll(...params);
    if (!res) throw new Error('No response');
    const body = JSON.parse(res.body);
    expect(body.message).toEqual('Orders retrieved successfully');
  });

  it('test first object in error array in the response response', async () => {
    const spy = jest.spyOn(Order, 'getAll').mockReturnValueOnce({} as any);
    const res = await handlerGetAll(...params);

    expect(spy).toHaveBeenCalled();
    if (!res) throw new Error('No response');

    const body = JSON.parse(res.body);
    const error = body.errors[0];
    expect(error).toEqual(
      expect.objectContaining({
        code: expect.any(String),
        message: expect.any(String),
      })
    );
  });
});

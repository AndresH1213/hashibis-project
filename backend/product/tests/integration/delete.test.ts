import { handler as handlerDelete } from '@/src/delete-product';

jest.mock('@/layer/models/Product');

let restParams: [any, any] = [{} as any, () => {}];
const params: [any, any, any] = [
  { pathParameters: { id: '12345' } },
  ...restParams,
];

describe('Suite for test the lambda for delete product', function () {
  it('test the object for success response 200', async () => {
    const res = await handlerDelete(...params);
    if (!res) throw new Error('No response');

    expect(res.statusCode).toEqual(204);
  });

  it('test the message for failed response when param id is not passed', async () => {
    const res = await handlerDelete({} as any, ...restParams);
    if (!res) throw new Error('No response');
    const body = JSON.parse(res.body);
    const errors = body.errors;
    expect(errors).toBeInstanceOf(Array);
  });

  it('test the message for success response undefined', async () => {
    const res = await handlerDelete(...params);
    if (!res) throw new Error('No response');
    const body = JSON.parse(res.body);
    expect(body.message).toBeUndefined();
  });
});

import { handler as handlerGetById } from '@/src/get-by-id';
import MedicalHistory from '@/layer/models/MedicalHistory';

jest.mock('@/layer/models/MedicalHistory');

let restParams: [any, any] = [{} as any, () => {}];
const params: [any, any, any] = [
  { pathParameters: { id: '12345' } },
  ...restParams,
];

describe('Suite for test the lambda for get medical history of the user', function () {
  it('test the object for success response 200', async () => {
    const res = await handlerGetById(...params);
    if (!res) throw new Error('No response');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
  });

  it('test the message for failed response when param id is not passed', async () => {
    const res = await handlerGetById({} as any, ...restParams);
    if (!res) throw new Error('No response');
    const body = JSON.parse(res.body);
    const errors = body.errors;
    expect(errors).toBeInstanceOf(Array);
  });

  it('test the message for success response', async () => {
    const res = await handlerGetById(...params);
    if (!res) throw new Error('No response');
    const body = JSON.parse(res.body);
    expect(body.message).toEqual('Medical History retrieved successfully');
  });

  it('return the error response when document is not found', async () => {
    const spy = jest
      .spyOn(MedicalHistory.prototype, 'getByUser')
      .mockReturnValueOnce({} as any);
    const res = await handlerGetById(...params);
    if (!res) throw new Error('No response');
    expect(spy).toHaveBeenCalled();
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

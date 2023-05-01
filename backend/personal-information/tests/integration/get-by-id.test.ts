import { handler as handlerGetById } from '@/src/get-personal-information';
import PersonalInformation from '@/layer/models/PersonalInformation';

jest.mock('@/layer/models/PersonalInformation');

let restParams: [any, any] = [{} as any, () => {}];
const params: [any, any, any] = [
  { pathParameters: { id: '12345' } },
  ...restParams,
];

describe('Suite for test the lambda for get personal information of the user', function () {
  it('test the object for success response 200', async () => {
    const res = await handlerGetById(...params);
    if (!res) throw new Error('No response');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
  });

  it('test the message for success response', async () => {
    const res = await handlerGetById(...params);
    if (!res) throw new Error('No response');
    const body = JSON.parse(res.body);
    expect(body.message).toEqual('Personal Information retrieved successfully');
  });

  it('return the error response when document is not found', async () => {
    const spy = jest
      .spyOn(PersonalInformation.prototype, 'getByUser')
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

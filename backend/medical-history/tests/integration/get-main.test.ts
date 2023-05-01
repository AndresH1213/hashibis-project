import { handler as handlerGetMain } from '@/src/get-main';
import MedicalHistory from '@/layer/models/MedicalHistory';

jest.mock('@/layer/models/MedicalHistory');

const params: [any, any, any] = [{} as any, {} as any, () => {}];

describe('Suite for test the lambda for get the medical history of the user', function () {
  it('test the object for success response', async () => {
    const spy = jest.spyOn(MedicalHistory.prototype, 'getByUser');
    const res = await handlerGetMain(...params);
    expect(spy).toHaveBeenCalled();
    if (!res) throw new Error('No response');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();

    spy.mockRestore();
  });

  it('test the message for success response', async () => {
    const res = await handlerGetMain(...params);
    if (!res) throw new Error('No response');
    const body = JSON.parse(res.body);
    expect(body.message).toEqual('Medical History retrieved successfully');
  });

  it('test first object in error array in the response response', async () => {
    const spy = jest
      .spyOn(MedicalHistory.prototype, 'getByUser')
      .mockReturnValueOnce({} as any);
    const res = await handlerGetMain(...params);

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

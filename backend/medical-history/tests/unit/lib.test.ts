import { GetByIdMedicalHistoryRequest } from '@/layer/lib/requests/GetMedicalHistoryRequest';
import {
  CreateMedicalHistoryRequest,
  UpdateMedicalHistoryRequest,
} from '@/layer/lib/requests/PutMedicalHistoryRequest';
import MedicalHistorySch from '@/layer/lib/schemas/MedicalHistory';

describe('that request classes inherit from ApiGatewayRequest', () => {
  it('shows that requests should be an implementation of ApiGwRequest', () => {
    expect(GetByIdMedicalHistoryRequest.prototype).toHaveProperty('validate');
    expect(CreateMedicalHistoryRequest.prototype).toHaveProperty('validate');
    expect(UpdateMedicalHistoryRequest.prototype).toHaveProperty('validate');
  });
  it('shows that schemas should have getSchema method ', () => {
    expect(MedicalHistorySch).toHaveProperty('getSchema');
  });
});

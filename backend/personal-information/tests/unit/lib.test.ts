import { GetPersonalInformationRequest } from '@/layer/lib/requests/GetPersonalInformationRequest';
import {
  CreatePersonalInformationRequest,
  UpdatePersonalInformationRequest,
} from '@/layer/lib/requests/PutPersonalInformationRequest';
import PersonalInformationSch from '@/layer/lib/schemas/PersonalInformation';

describe('that request classes inherit from ApiGatewayRequest', () => {
  it('shows that requests should be an implementation of ApiGwRequest', () => {
    expect(GetPersonalInformationRequest.prototype).toHaveProperty('validate');
    expect(CreatePersonalInformationRequest.prototype).toHaveProperty(
      'validate'
    );
    expect(UpdatePersonalInformationRequest.prototype).toHaveProperty(
      'validate'
    );
  });
  it('shows that schemas should have getSchema method ', () => {
    expect(PersonalInformationSch).toHaveProperty('getSchema');
  });
});

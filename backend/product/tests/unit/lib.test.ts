import {
  GetAllProductsRequest,
  GetProductRequest,
} from '@/layer/lib/requests/GetProductRequest';
import {
  CreateProductRequest,
  UpdateProductRequest,
} from '@/layer/lib/requests/PutProductRequest';
import { DeleteProductRequest } from '@/layer/lib/requests/DeleteProductRequest';
import ProductSch from '@/layer/lib/schemas/ProductSchema';

describe('that request classes inherit from ApiGatewayRequest', () => {
  it('shows that requests should be an implementation of ApiGwRequest', () => {
    expect(GetAllProductsRequest.prototype).toHaveProperty('validate');
    expect(GetProductRequest.prototype).toHaveProperty('validate');
    expect(CreateProductRequest.prototype).toHaveProperty('validate');
    expect(UpdateProductRequest.prototype).toHaveProperty('validate');
    expect(DeleteProductRequest.prototype).toHaveProperty('validate');
  });
  it('shows that schemas should have getSchema method ', () => {
    expect(ProductSch).toHaveProperty('getSchema');
  });
});

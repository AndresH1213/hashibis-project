import {
  GetAllOrdersRequest,
  GetOrderRequest,
} from '@/layer/lib/requests/GetOrderRequest';
import CreateOrderRequest from '@/layer/lib/requests/CreateOrderRequest';
import OrderSch from '@/layer/lib/schemas/Order';
import ProductSch from '@/layer/lib/schemas/Product';
import ShippingSch from '@/layer/lib/schemas/Shipping';

describe('that request classes inherit from ApiGatewayRequest', () => {
  it('shows that requests should be an implementation of ApiGwRequest', () => {
    expect(GetAllOrdersRequest.prototype).toHaveProperty('validate');
    expect(GetOrderRequest.prototype).toHaveProperty('validate');
    expect(CreateOrderRequest.prototype).toHaveProperty('validate');
  });
  it('shows that schemas should have getSchema method ', () => {
    expect(OrderSch).toHaveProperty('getSchema');
    expect(ProductSch).toHaveProperty('getSchema');
    expect(ShippingSch).toHaveProperty('getSchema');
  });
});

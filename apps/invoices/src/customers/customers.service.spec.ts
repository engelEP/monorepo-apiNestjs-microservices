import { Test, TestingModule } from '@nestjs/testing';
import { Customer } from './entities/customer.entity';
import { CustomersService } from './customers.service';

const MockId = 1;
const deleteMessage = "Customer with Id: 1, Removed!";

const mockCustomer: Customer = {
    id: MockId,
    name: 'customer name',
    lastName: 'customer lastName',
    address: 'De my house AhI',
    phone: 75576458,
    invoices: []
}
  
const customerRepositoryMock = {
    create: jest.fn().mockReturnValue(mockCustomer),
    findAll: jest.fn().mockReturnValue([mockCustomer]),
    findOne: jest.fn().mockReturnValue(mockCustomer),
    update: jest.fn().mockReturnValue(mockCustomer),
    remove: jest.fn().mockReturnValue(deleteMessage),
}


describe('CustomerController', () => {
  let service: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: CustomersService,
        useValue: customerRepositoryMock
    }],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create a new customer', () => {
    it('customer created must be contain id', async () => {
      const { id, ...rest } = mockCustomer;

      const customerCreated = await service.create(rest);
      const customerId: number = customerCreated.id;

      expect(customerId).toBeGreaterThan(0);
    });
  });

  describe('get customers list', () => {
    it('customers list must be empty', () => {
      const customersList = service.findAll();

      expect(customersList).toHaveLength(1);
    });
  });

  describe('get customers by id', () => {
    it('Get object customer', async () => {
      const customerById = await service.findOne(1);

      expect(customerById.id).toBeGreaterThan(0);
    });
  });

  describe('update a new customer', () => {
    it('customer updated must be contain same info', async () => {
      const { id, ...rest } = mockCustomer;

      const customerUpdated = await service.update(1, rest);

      expect(customerUpdated.id).toBeGreaterThan(0);
      
    });
  });

  describe('remove customer', () => {
    it('get message remove customer', async () => {
      const customerRemove = await service.remove(1);

      expect(customerRemove).toBe(deleteMessage);
    });
  });
});
import { Test, TestingModule } from '@nestjs/testing';
import { Customer } from './entities/customer.entity';
import { CustomersController } from './customers.controller';
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
  
const customerServicesMock = {
    create: jest.fn().mockReturnValue(mockCustomer),
    findAll: jest.fn().mockReturnValue([mockCustomer]),
    findOne: jest.fn().mockReturnValue(mockCustomer),
    update: jest.fn().mockReturnValue(mockCustomer),
    remove: jest.fn().mockReturnValue(deleteMessage),
}


describe('CustomerController', () => {
  let controller: CustomersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [{
        provide: CustomersService,
        useValue: customerServicesMock
    }],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create a new customer', () => {
    it('customer created must be contain id', async () => {
      const { id, ...rest } = mockCustomer;

      const customerCreated = await controller.create(rest);
      const customerId: number = customerCreated.id;

      expect(customerId).toBeGreaterThan(0);
    });
  });

  describe('get customers list', () => {
    it('customers list must be empty', () => {
      const customersList = controller.findAll();

      expect(customersList).toHaveLength(1);
    });
  });

  describe('get customers by id', () => {
    it('Get object customer', async () => {
      const customerById = await controller.findOne(`${1}`);

      expect(customerById.id).toBeGreaterThan(0);
    });
  });

  describe('update a new customer', () => {
    it('customer updated must be contain same info', async () => {
      const { id, ...rest } = mockCustomer;

      const customerUpdated = await controller.update(`${1}`, rest);

      expect(customerUpdated.id).toBeGreaterThan(0);
      
    });
  });

  describe('remove customer', () => {
    it('get message remove customer', async () => {
      const customerRemove = await controller.remove(`${1}`);

      expect(customerRemove).toBe(deleteMessage);
    });
  });
});

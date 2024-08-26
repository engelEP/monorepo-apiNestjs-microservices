import { Test, TestingModule } from '@nestjs/testing';
import { Invoice } from './entities/invoice.entity';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';

const MockId = 1;
const deleteMessage = "Invoice with Id: 1, Removed!";

const mockInvoice: Invoice = {
    id: MockId,
    customer: {
        id: MockId,
        name: 'customer name',
        lastName: 'customer lastName',
        address: 'De my house AhI',
        phone: 75576458,
        invoices: []
    },
    seller: {
        id: MockId,
        name: "seller name",
        lastName: "seller lastName",
        invoices: []
    },
    date: new Date(Date.now()),
    total: 345.56,
    invoiceDetails: []
}
  
const invoiceServicesMock = {
    create: jest.fn().mockReturnValue(mockInvoice),
    findAll: jest.fn().mockReturnValue([mockInvoice]),
    findOne: jest.fn().mockReturnValue(mockInvoice),
    update: jest.fn().mockReturnValue(mockInvoice),
    remove: jest.fn().mockReturnValue(deleteMessage),
}


describe('InvoiceController', () => {
  let controller: InvoicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoicesController],
      providers: [{
        provide: InvoicesService,
        useValue: invoiceServicesMock
    }],
    }).compile();

    controller = module.get<InvoicesController>(InvoicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create a new invoice', () => {
    it('invoice created must be contain id', async () => {
        const {
          id,
          customer: { id: customerId },
          seller: { id: sellerId },
          invoiceDetails,
          ...rest
        } = mockInvoice;

      const invoiceCreated = await controller.create({
        customerId,
        sellerId,
        ...rest
      });
      const invoiceId: number = invoiceCreated.id;

      expect(invoiceId).toBeGreaterThan(0);
    });
  });

  describe('get invoice list', () => {
    it('invoice list must be empty', () => {
      const invoiceList = controller.findAll();

      expect(invoiceList).toHaveLength(1);
    });
  });

  describe('get invoice by id', () => {
    it('Get object invoice', async () => {
      const invoiceById = await controller.findOne(`${1}`);

      expect(invoiceById.id).toBeGreaterThan(0);
    });
  });

  describe('update a new invoice', () => {
    it('invoice updated must be contain same info', async () => {
      const {
        id,
        customer: { id: customerId },
        seller: { id: sellerId },
        invoiceDetails,
        ...rest
      } = mockInvoice;

      const invoiceUpdated = await controller.update(`${id}`, {
        customerId,
        sellerId,
        ...rest
      });

      expect(invoiceUpdated.id).toBeGreaterThan(0);
      
    });
  });

  describe('remove invoice', () => {
    it('get message remove invoice', async () => {
      const invoiceRemove = await controller.remove(`${1}`);

      expect(invoiceRemove).toBe(deleteMessage);
    });
  });
});

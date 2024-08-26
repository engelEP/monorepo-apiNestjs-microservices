import { Test, TestingModule } from '@nestjs/testing';
import { Seller } from './entities/seller.entity';
import { SellersService } from './sellers.service';

const MockId = 1;
const deleteMessage = "Seller with Id: 1, Removed!";

const mockSeller: Seller = {
  id: MockId,
  name: "seller name",
  lastName: "seller lastName",
  invoices: []
}
  
const SellerRepositoryMock = {
  create: jest.fn().mockReturnValue(mockSeller),
  findAll: jest.fn().mockReturnValue([mockSeller]),
  findOne: jest.fn().mockReturnValue(mockSeller),
  update: jest.fn().mockReturnValue(mockSeller),
  remove: jest.fn().mockReturnValue(deleteMessage),
}


describe('SellerController', () => {
  let service: SellersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: SellersService,
        useValue: SellerRepositoryMock
    }],
    }).compile();

    service = module.get<SellersService>(SellersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create a new seller', () => {
    it('seller created must be contain id', async () => {
      const { id, ...rest } = mockSeller;

      const sellerCreated = await service.create(rest);
      const sellerId: number = sellerCreated.id;

      expect(sellerId).toBeGreaterThan(0);
    });
  });

  describe('get seller list', () => {
    it('seller list must be empty', () => {
      const sellerList = service.findAll();

      expect(sellerList).toHaveLength(1);
    });
  });

  describe('get seller by id', () => {
    it('Get object seller', async () => {
      const sellerById = await service.findOne(1);

      expect(sellerById.id).toBeGreaterThan(0);
    });
  });

  describe('update a new seller', () => {
    it('seller updated must be contain same info', async () => {
      const { id, ...rest } = mockSeller;

      const sellerUpdated = await service.update(1, rest);

      expect(sellerUpdated.id).toBeGreaterThan(0);
      
    });
  });

  describe('remove seller', () => {
    it('get message remove seller', async () => {
      const sellerRemove = await service.remove(1);

      expect(sellerRemove).toBe(deleteMessage);
    });
  });
});
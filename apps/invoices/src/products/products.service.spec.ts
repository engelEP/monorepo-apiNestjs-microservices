import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

const MockId = 1;
const deleteMessage = "Product with Id: 1, Removed!";

const mockProduct: Product = {
    id: MockId,
    name: 'Product 1',
    description: 'Description for product 1',
    unitOfMeasure: 'lb',
    price: 12.4,
    stock: 30,
    invoicesDetails: []
}
  
const productRepositoryMock = {
    create: jest.fn().mockReturnValue(mockProduct),
    findAll: jest.fn().mockReturnValue([mockProduct]),
    findOne: jest.fn().mockReturnValue(mockProduct),
    update: jest.fn().mockReturnValue(mockProduct),
    remove: jest.fn().mockReturnValue(deleteMessage),
}


describe('ProductService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: ProductsService,
        useValue: productRepositoryMock
    }],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create a new product', () => {
    it('product created must be contain id', async () => {
      const { id, ...rest } = mockProduct;

      const productCreated = await service.create(rest);
      const productId: number = productCreated.id;

      expect(productId).toBeGreaterThan(0);
    });
  });

  describe('get products list', () => {
    it('product list must be empty', () => {
      const productList = service.findAll();

      expect(productList).toHaveLength(1);
    });
  });

  describe('get product by id', () => {
    it('Get object product', async () => {
      const productById = await service.findOne(1);

      expect(productById.id).toBeGreaterThan(0);
    });
  });

  describe('update a new product', () => {
    it('product updated must be contain', async () => {
      const { id, ...rest } = mockProduct;

      const productUpdated = await service.update(1, rest);

      expect(productUpdated.id).toBeGreaterThan(0);
    });
  });

  describe('remove product', () => {
    it('product remove by id', async () => {
      const productRemove = await service.remove(1);

      expect(productRemove).toBe(deleteMessage);
    });
  });
});

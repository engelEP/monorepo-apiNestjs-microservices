import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
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
  
const productServicesMock = {
    create: jest.fn().mockReturnValue(mockProduct),
    findAll: jest.fn().mockReturnValue([mockProduct]),
    findOne: jest.fn().mockReturnValue(mockProduct),
    update: jest.fn().mockReturnValue(mockProduct),
    remove: jest.fn().mockReturnValue(deleteMessage),
}


describe('ProductController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{
        provide: ProductsService,
        useValue: productServicesMock
    }],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create a new product', () => {
    it('product created must be contain id', async () => {

      const productCreated = await controller.create(mockProduct);
      const productId: number = productCreated.id;

      expect(productId).toBeGreaterThan(0);
    });
  });

  describe('get products list', () => {
    it('product list must be empty', () => {
      const productList = controller.findAll();

      expect(productList).toHaveLength(1);
    });
  });

  describe('get product by id', () => {
    it('Get object product', async () => {
      const productById = await controller.findOne(`${1}`);

      expect(productById.id).toBeGreaterThan(0);
    });
  });

  describe('update a new product', () => {
    it('product updated must be contain same info', async () => {

      const productUpdated = await controller.update(`${1}`, mockProduct);

      expect(productUpdated.id).toBeGreaterThan(0);
      
    });
  });

  describe('remove product', () => {
    it('get message remove product', async () => {
      const productRemove = await controller.remove(`${1}`);

      expect(productRemove).toBe(deleteMessage);
    });
  });
});

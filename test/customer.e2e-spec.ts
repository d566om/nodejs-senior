import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CustomerService } from './../src/customer/customer.service';

// Execute in terminal: jest customer.e2e-spec.ts --config=jest-e2e.json

describe('CustomerController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/customers (GET) - should return all customers', async () => {
    const response = await request(app.getHttpServer()).get('/customers').expect(200);
    expect(response.body).toBeDefined();
  });

  it('/customers/:id (GET) - should return a customer by ID', async () => {
    const response = await request(app.getHttpServer()).get('/customers/1').expect(200);
    expect(response.body).toBeDefined();
  });

  it('/customers (POST) - should create a new customer', async () => {
    const createCustomerInput = {
      email: 'newcustomer@example.com',
      description: 'New Customer Description',
    };

    const response = await request(app.getHttpServer())
      .post('/customers')
      .send(createCustomerInput)
      .expect(201);

    expect(response.body).toBeDefined();
  });

  it('/customers/:id (PUT) - should update a customer by ID', async () => {
    const updateCustomerInput = {
      email: 'updatedcustomer@example.com',
      description: 'Updated Customer Description',
    };

    const response = await request(app.getHttpServer())
      .put('/customers/1')
      .send(updateCustomerInput)
      .expect(200);

    expect(response.body).toBeDefined();
  });

  it('/customers/:id (DELETE) - should delete a customer by ID', async () => {
    const response = await request(app.getHttpServer()).delete('/customers/1').expect(200);
    expect(response.body).toBeDefined();
  });

  afterEach(async () => {
    await app.close();
  });
});

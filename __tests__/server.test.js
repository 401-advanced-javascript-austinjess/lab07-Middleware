const { server } = require('../lib/server');
const supertest = require('supertest');
const mockRequest = supertest(server);

global.console = {
  log: jest.fn(),
  info: jest.fn(),
  error: jest.fn(),
};

describe('Web Server', () => {
  it('returns 404 for a bad link', () => {
    return mockRequest.get('/404').expect(404);
  });

  // it('there should be a requestTime property on the request object', () => {
  //   return mockRequest.get('/a').expect();
  // });

  // it('should console a message', () => {
  //   console.log('My test is working ith console.log');

  //   expect(global.console.log).toHaveBeenCalledWith(
  //     'My test is working with console.log'
  //   );
  // });

  // it('should throw an error when accessing endpoint /d', () => {
  //   return mockRequest.get('/d').expect('ERROR');
  // });
});

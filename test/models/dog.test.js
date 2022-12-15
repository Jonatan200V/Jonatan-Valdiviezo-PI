// const { conn, Temperament, Dog } = require('../../src/db');

// describe('Dog model', () => {
//   beforeAll(() => {
//     conn.sync({ force: true });
//   });
//   it('should not create the Dog if name is not send', async () => {
//     expect.assertions(1);
//     try {
//       await Dog.create({ dog_height: '20-20' });
//     } catch (error) {
//       expect(error.message).toBeDefined();
//     }
//   });
// });
// afterAll(async () => {
//   conn.sync({ force: true });
//   await conn.close();
// });

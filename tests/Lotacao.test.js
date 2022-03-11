const request = require('supertest');
const jwt = require('jsonwebtoken');


describe("Lotacao", () => {

    const token = jwt.sign({
        name: 'Test',
        cpf: Math.floor(10000000000 + Math.random() * 90000000000).toString(),
        email: `${Math.random().toString(36).substr(2, 5)}@gmail.com`,
        phone: '988884444',
        secondaryPhone: '998888444',
        office: 'Policial',
        location: 'DPSS',
        features: ['608dc9a61286380b31a51233'],
        address: 'brasilia',
        userID: '6089c3538dfebe00555bc17e'
    }, process.env.SECRET, {
        expiresIn: 240,
    });


    const lotacao = {
        name:"1° DP",
        description:"1° DP de go",
        lotacaoID:"6089c3538dfebe44555bc17e"
    }

    it('Create a lotacao', async (done) => {
        const res = await request(app).post('/lotacao/create/').set('x-access-token', token).send({
          name:"1° DP",
          description:"1° DP de Goias"
        });
        expect(res.statusCode).toBe(200);
      
        done();
    });

    it('List All lotacao', async (done) => {
        const res = await request(app).get('/lotacao/').set('x-access-token', token);
        expect(res.statusCode).toBe(200);
        done();
    });

    it('Update a lotacao', async (done) => {
        const res1 = await request(app).post('/lotacao/create/').set('x-access-token', token).send(lotacao);
        const res = await request(app).put('/lotacao/update/6089c3538dfebe44555bc17e').set('x-access-token', token);
        expect(res.statusCode).toBe(200);
        done();
    });

    it('Delete a lotacao', async (done) => {
        await request(app).post('/lotacao/create/').set('x-access-token', token).send(lotacao);
        const res = await request(app).delete('/lotacao/delete/6089c3538dfebe44555bc17e').set('x-access-token', token);
        expect(res.statusCode).toBe(200);
        done();
    });

    it('Delete a invalid lotacao', async (done) => {
        await request(app).post('/lotacao/create/').set('x-access-token', token).send(lotacao);
        const res = await request(app).delete('/lotacao/delete/23923293').set('x-access-token', token);
        expect(res.statusCode).toBe(400);
        done();
    });

    
});
  
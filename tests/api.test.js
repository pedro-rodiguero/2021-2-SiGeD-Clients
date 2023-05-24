const request = require('supertest');
const app = require('../src/index');
const jwt = require('jsonwebtoken');

describe('Sample Test', () => {
  let activeID, notActiveID;


  const lotacao = {
    name: "1° DP",
    description: "1° DP de go",
    lotacaoID: "6089c3538dfebe44555bc17e"
  };

  const client = {
    active: true,
    name: 'Davi Rogerio',
    email: `${Math.random().toString(36).substr(2, 5)}@gmail.com`,
    cpf: '93896681079',
    phone: '61988884444',
    secondaryPhone: '61988884445',
    office: 'Policial',
    location: '6089c3538dfebe44555bc17e',
    features: ['608dc9a61286380b31a51233'],
    image: '1244365aahsbch',
    address: 'Brasília',
    userID: '6089c3538dfebe00555bc17e'
  };
  const falseClient = {
    name: 'Bruno',
    cpf: '92544008075',
    email: `${Math.random().toString(36).substr(2, 5)}@gmail.com`,
    phone: '61977854444',
    secondaryPhone: '61977854445',
    office: 'Policial',
    location: '6089c3538dfebe44555bc17e',
    features: ['608dc9a61286380b31a51233'],
    image: '1244365aahsbch',
    address: 'Ceilândia',
    userID: '6089c3538dfebe00555bc17e',
    active: false,
  };
  const token = jwt.sign({
    name: 'Test',
    cpf: Math.floor(10000000000 + Math.random() * 90000000000).toString(),
    email: `${Math.random().toString(36).substr(2, 5)}@gmail.com`,
    phone: '988884444',
    secondaryPhone: '998888444',
    office: 'Policial',
    location: '6089c3538dfebe44555bc17e',
    features: ['608dc9a61286380b31a51233'],
    address: 'brasilia',
    userID: '6089c3538dfebe00555bc17e'
  }, process.env.SECRET, {
    expiresIn: 240,
  });
  const feature = {
    name: 'old',
    description: 'privilegs',
    color: 'blue',
  }

  const editFeature = {
    name: 'sick',
    description: 'rest in peace',
    color: 'black',
  }


  const client1 = {
    name: 'Cliente Um',
    cpf: '58714685000',
    email: 'um@gmail.com',
    phone: '61988884401',
    secondaryPhone: '61988884410',
    office: 'Policial',
    location: '6089c3538dfebe44555bc17e',
    address: 'Brasília',
    userID: '6089c3538dfebe00555bc17e'
  };
  const client2 = {
    name: 'Cliente Dois',
    cpf: '96731355097',
    email: 'dois@gmail.com',
    phone: '61988884402',
    secondaryPhone: '61988884420',
    office: 'Policial',
    location: '6089c3538dfebe44555bc17e',
    address: 'Brasília',
    userID: '6089c3538dfebe00555bc17e'
  };
  const client3 = {
    name: 'Cliente Três',
    cpf: '52062057024',
    email: 'tres@gmail.com',
    phone: '61988884403',
    secondaryPhone: '61988884430',
    office: 'Policial',
    location: '6089c3538dfebe44555bc17e',
    address: 'Brasília',
    userID: '6089c3538dfebe00555bc17e'
  };
  const client4 = {
    name: 'Cliente Quatro',
    cpf: '71104219026',
    email: 'quatro@gmail.com',
    phone: '61988884404',
    secondaryPhone: '61988884440',
    office: 'Policial',
    location: '6089c3538dfebe44555bc17e',
    address: 'Brasília',
    userID: '6089c3538dfebe00555bc17e'
  };
  const client5 = {
    name: 'Cliente Cinco',
    cpf: '21442505028',
    email: 'cinco@gmail.com',
    phone: '61988884405',
    secondaryPhone: '61988884450',
    office: 'Policial',
    location: '6089c3538dfebe44555bc17e',
    address: 'Brasília',
    userID: '6089c3538dfebe00555bc17e'
  };

  beforeAll(async () => {
    await request(app).post('/lotacao/create/').set('x-access-token', token).send(lotacao);
    await request(app).post('/clients/create/').set('x-access-token', token).send(client1);
    await request(app).post('/clients/create/').set('x-access-token', token).send(client2);
    await request(app).post('/clients/create/').set('x-access-token', token).send(client3);
    await request(app).post('/clients/create/').set('x-access-token', token).send(client4);
    await request(app).post('/clients/create/').set('x-access-token', token).send(client5);
  })

  it('App is defined', (done) => {
    expect(app).toBeDefined();
    done();
  });

  it('Get newest four clients', async (done) => {
    const res = await request(app).get('/clients/newest-four').set('x-access-token', token);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(4);
    done();
  });

  it('Post client', async (done) => {
    const res = await request(app).post('/clients/create/').set('x-access-token', token).send(client);
    expect(res.statusCode).toBe(200);
    expect(res.body.phone).toBe(client.phone);
    expect(res.body.secondaryPhone).toBe(client.secondaryPhone);
    expect(res.body.cpf).toBe(client.cpf);
    expect(res.body.name).toBe(client.name);
    expect(res.body.email).toBe(client.email);
    expect(res.body.location).toBe(client.location);
    expect(res.body.features).toEqual(client.features);
    expect(res.body.image).toEqual(client.image);
    expect(res.body.address).toBe(client.address);
    expect(res.body.office).toBe(client.office);
    activeID = res.body._id;
    done();
  });

  it('Post false client', async (done) => {
    const res = await request(app).post('/clients/create/').set('x-access-token', token).send(falseClient);
    expect(res.statusCode).toBe(200);
    expect(res.body.phone).toBe(falseClient.phone);
    expect(res.body.secondaryPhone).toBe(falseClient.secondaryPhone);
    expect(res.body.cpf).toBe(falseClient.cpf);
    expect(res.body.name).toBe(falseClient.name);
    expect(res.body.email).toBe(falseClient.email);
    expect(res.body.location).toBe(falseClient.location);
    expect(res.body.address).toBe(falseClient.address);
    expect(res.body.office).toBe(falseClient.office);
    expect(res.body.active).toBe(falseClient.active);
    notActiveID = res.body._id;
    done();
  });

  it('Post client invalid fields error', async (done) => {
    const errorClient = {
      name: '',
      cpf: '',
      email: '',
      phone: '',
      secondaryPhone: '',
      office: '',
      location: '',
      address: '',
      userID: '6089c3538dfebe00555bc17e'
    };
    const res = await request(app).post('/clients/create/').set('x-access-token', token).send(errorClient);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toEqual(["invalid name", "invalid cpf", "invalid email", "invalid phone", "invalid secondary phone"]);
    done();
  });

  it('Post client invalid user error', async (done) => {
    const invalidUserClient = {
      name: 'Davi Rogerio',
      email: `${Math.random().toString(36).substr(2, 5)}@gmail.com`,
      cpf: '93896681079',
      phone: '61988884444',
      secondaryPhone: '61988884445',
      office: 'Policial',
      location: '6089c3538dfebe44555bc17e',
      features: ['608dc9a61286380b31a51233'],
      image: '1244365aahsbch',
      address: 'Brasília',
      userID: 'asdsa12'
    };
    const res = await request(app).post('/clients/create/').set('x-access-token', token).send(invalidUserClient);
    expect(res.statusCode).toBe(400);
    done();
  });

  it('Get clients', async (done) => {
    const res = await request(app).get('/clients/').set('x-access-token', token);
    const lastIdx = res.body.length - 1; // Get last client on list
    expect(res.statusCode).toBe(200);
    expect(res.body[lastIdx].name).toBe(client.name);
    expect(res.body[lastIdx].cpf).toBe(client.cpf);
    expect(res.body[lastIdx].email).toBe(client.email);
    expect(res.body[lastIdx].phone).toBe(client.phone);
    expect(res.body[lastIdx].secondaryPhone).toBe(client.secondaryPhone);
    expect(res.body[lastIdx].office).toBe(client.office);
    //expect(res.body[lastIdx].location).toBe(client.location);
    expect(res.body[lastIdx].address).toBe(client.address);
    expect(res.body[lastIdx].active).toBe(true);
    done();
  });

  it('Get clients paginate', async (done) => {  
    const pagination = {  
      page:   0,   
      limit:  3,  
    };  
    const res = await request(app).get(`/clients`).set('x-access-token', token).query(pagination);  
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(pagination.limit);
    expect(res.body[0].cpf).toBe(client1.cpf);
    expect(res.body[0].name).toBe(client1.name);
    expect(res.body[0].email).toBe(client1.email);
    expect(res.body[0].image).toEqual(client1.image);
    expect(res.body[0].address).toBe(client1.address);
    expect(res.body[0].office).toBe(client1.office);

    expect(res.body[res.body.length - 1].cpf).toBe(client3.cpf);
    expect(res.body[res.body.length - 1].name).toBe(client3.name);
    expect(res.body[res.body.length - 1].email).toBe(client3.email);
    expect(res.body[res.body.length - 1].image).toEqual(client3.image);
    expect(res.body[res.body.length - 1].address).toBe(client3.address);
    expect(res.body[res.body.length - 1].office).toBe(client3.office);

    const nextPagination = {  
      page:   1,   
      limit:  3,  
    };  
    const nextRes = await request(app).get(`/clients`).set('x-access-token', token).query(nextPagination);  
    expect(nextRes.statusCode).toBe(200);
    expect(nextRes.body.length).toBe(nextPagination.limit);  

    expect(nextRes.body[0].cpf).toBe(client4.cpf);
    expect(nextRes.body[0].name).toBe(client4.name);
    expect(nextRes.body[0].email).toBe(client4.email);
    expect(nextRes.body[0].image).toEqual(client4.image);
    expect(nextRes.body[0].address).toBe(client4.address);
    expect(nextRes.body[0].office).toBe(client4.office);

    expect(nextRes.body[nextRes.body.length - 1].cpf).toBe(client.cpf);
    expect(nextRes.body[nextRes.body.length - 1].name).toBe(client.name);
    expect(nextRes.body[nextRes.body.length - 1].email).toBe(client.email);
    expect(nextRes.body[nextRes.body.length - 1].image).toEqual(client.image);
    expect(nextRes.body[nextRes.body.length - 1].address).toBe(client.address);
    expect(nextRes.body[nextRes.body.length - 1].office).toBe(client.office);

    done();  
  }); 

  it('Get clients filtered', async (done) => {  
    const filterName = {  
      filters:   {  
        name : 'Cliente Um',  
      },  
    };  
    const res = await request(app).get(`/clients`).set('x-access-token', token).query(filterName);  
    expect(res.statusCode).toBe(200);  
    expect(res.body[0].name).toBe(client1.name);  
  
    const filterEmail = {  
      filters:   {  
        email : 'um@gmail.com',  
      },  
    };  
    const nextRes = await request(app).get(`/clients`).set('x-access-token', token).query(filterEmail);  
    expect(nextRes.statusCode).toBe(200);  
    expect(nextRes.body[0].email).toBe(client1.email);  

    done();  
  });

  it('Get clients sorted', async (done) => {
    const sortDesc = {
      sort: {
        name: -1,
      },
    }

    const res = await request(app).get(`/clients`).set('x-access-token', token).query(sortDesc);  
    expect(res.statusCode).toBe(200);  
    expect(res.body[0].email).toBe(client.email);

    const sortAsc = {
      sort: {
        name: 1,
      },
    }

    const newRes = await request(app).get(`/clients`).set('x-access-token', token).query(sortAsc);  
    expect(newRes.statusCode).toBe(200);  
    expect(newRes.body[0].email).toBe(client5.email);  

    done();
  });

  it('Get client by id', async (done) => {
    const res = await request(app).get(`/clients/${activeID}`).set('x-access-token', token);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(client.name);
    expect(res.body.cpf).toBe(client.cpf);
    expect(res.body.email).toBe(client.email);
    expect(res.body.phone).toBe(client.phone);
    expect(res.body.secondaryPhone).toBe(client.secondaryPhone);
    expect(res.body.office).toBe(client.office);
    //expect(res.body.location).toBe(client.location);
    expect(res.body.address).toBe(client.address);
    expect(res.body.active).toBe(true);
    done();
  });

  it('Get client by id error', async (done) => {
    idTest = 129382132103210321312;
    const res = await request(app).get(`/clients/${idTest}`).set('x-access-token', token);
    expect(res.statusCode).toBe(400);
    done();
  });

  it('Get deactivated clients', async (done) => {
    const res = await request(app).get('/clients?active=false').set('x-access-token', token);
    const lastIdx = res.body.length - 1; // Get last client on list
    expect(res.statusCode).toBe(200);
    expect(res.body[lastIdx].address).toBe(falseClient.address);
    //expect(res.body[lastIdx].location).toBe(falseClient.location);
    expect(res.body[lastIdx].email).toBe(falseClient.email);
    expect(res.body[lastIdx].office).toBe(falseClient.office);
    expect(res.body[lastIdx].cpf).toBe(falseClient.cpf);
    expect(res.body[lastIdx].name).toBe(falseClient.name);
    expect(res.body[lastIdx].phone).toBe(falseClient.phone);
    expect(res.body[lastIdx].secondaryPhone).toBe(falseClient.secondaryPhone);
    expect(res.body[lastIdx].active).toBe(false);
    done();
  });

  it('Get null clients', async (done) => {
    const res = await request(app).get('/clients?active=null').set('x-access-token', token);
    const lastIdx = res.body.length - 1; // Get last client on list
    expect(res.statusCode).toBe(200);
    expect(res.body[lastIdx].address).toBe(falseClient.address);
    //expect(res.body[lastIdx].location).toBe(falseClient.location);
    expect(res.body[lastIdx].email).toBe(falseClient.email);
    expect(res.body[lastIdx].office).toBe(falseClient.office);
    expect(res.body[lastIdx].cpf).toBe(falseClient.cpf);
    expect(res.body[lastIdx].name).toBe(falseClient.name);
    expect(res.body[lastIdx].phone).toBe(falseClient.phone);
    expect(res.body[lastIdx].secondaryPhone).toBe(falseClient.secondaryPhone);
    expect(res.body[lastIdx].active).toBe(false);
    done();
  });

  it('Get without token', async (done) => {
    const res = await request(app).get('/clients?active=false');
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ auth: false, message: 'No token was provided.' });
    done();
  });

  it('Get with invalid token', async (done) => {
    const res = await request(app).get('/clients?active=false').set('x-access-token', 'abc123');
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ auth: false, message: 'The token could not be authenticated.' });
    done();
  })

  it('Update client', async (done) => {
    const updatedClientData = {
      active: true,
      name: 'Davi Rogerio',
      email: `${Math.random().toString(36).substr(2, 5)}@gmail.com`,
      cpf: '07711229003',
      phone: '61988884444',
      secondaryPhone: '61988884445',
      office: 'Policial',
      location: '6089c3538dfebe44555bc17e',
      address: 'Brasília',
      userID: '6089c3538dfebe00555bc17e'
    }
    const res = await request(app).put(`/clients/update/${activeID}`).set('x-access-token', token).send(updatedClientData);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(updatedClientData.name);
    //expect(res.body.cpf).toBe(updatedClientData.cpf);
    //expect(res.body.email).toBe(updatedClientData.email);
    expect(res.body.phone).toBe(updatedClientData.phone);
    expect(res.body.secondaryPhone).toBe(updatedClientData.secondaryPhone);
    expect(res.body.office).toBe(updatedClientData.office);
    expect(res.body.location).toBe(updatedClientData.location);
    expect(res.body.address).toBe(updatedClientData.address);
    activeID = res.body._id;
    done();
  });

  it('Toggle active client', async (done) => {
    const toggleClientData = {
      active: false,
      name: 'Davi Rogerio',
      email: `${Math.random().toString(36).substr(2, 5)}@gmail.com`,
      cpf: '07711229003',
      phone: '61988884444',
      secondaryPhone: '61988884445',
      office: 'Policial',
      location: '6089c3538dfebe44555bc17e',
      address: 'Brasília',
      userID: '6089c3538dfebe00555bc17e'
    }
    const res = await request(app).put(`/clients/toggleStatus/${activeID}`).set('x-access-token', token);
    expect(res.statusCode).toBe(200);
    expect(res.body.active).toBe(toggleClientData.active);
    expect(res.body.name).toBe(toggleClientData.name);
    //expect(res.body.cpf).toBe(toggleClientData.cpf);
    //expect(res.body.email).toBe(toggleClientData.email);
    expect(res.body.phone).toBe(toggleClientData.phone);
    expect(res.body.secondaryPhone).toBe(toggleClientData.secondaryPhone);
    expect(res.body.office).toBe(toggleClientData.office);
    expect(res.body.location).toBe(toggleClientData.location);
    expect(res.body.address).toBe(toggleClientData.address);
    done();
  });

  it('Toggle client error', async (done) => {
    const toggleClientData = {
      active: false,
      name: 'Davi Rogerio',
      email: `${Math.random().toString(36).substr(2, 5)}@gmail.com`,
      cpf: '07711229003',
      phone: '61988884444',
      secondaryPhone: '61988884445',
      office: 'Policial',
      location: '6089c3538dfebe44555bc17e',
      address: 'Brasília',
      userID: '6089c3538dfebe00555bc17e'
    }
    idTest = 129382132103210321312;
    const res = await request(app).put(`/clients/toggleStatus/${idTest}`).set('x-access-token', token);
    expect(res.statusCode).toBe(400);
    done();
  });

  it('Schedule email', async (done) => {
    const emailBody = {
      dateString: '2021-04-04',
      subject: 'Assunto',
      text: 'Agendamento'
    }
    const res = await request(app).post(`/clients/send-email/${activeID}`).set('x-access-token', token).send(emailBody);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Email scheduled.');
    done();
  });

  it('Schedule email invalid client', async (done) => {
    const emailBody = {
      dateString: '2021-04-04',
      subject: 'Assunto',
      text: 'Agendamento'
    }
    const idTest = 123213213213214212151;
    const res = await request(app).post(`/clients/send-email/${idTest}`).set('x-access-token', token).send(emailBody);
    expect(res.statusCode).toBe(500);
    done();
  });

  it('Update client error', async (done) => {
    const updatedClientData = {
      name: '',
      cpf: '',
      email: '',
      phone: '',
      secondaryPhone: '',
      office: '',
      location: '',
      address: '',
      userID: '6089c3538dfebe00555bc17e'
    }
    const res = await request(app).put(`/clients/update/${activeID}`).set('x-access-token', token).send(updatedClientData);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toEqual(['invalid name', 'invalid cpf', 'invalid email', 'invalid phone', 'invalid secondary phone']);
    done();
  });

  it('Get client history', async (done) => {
    const client = {
      name: 'Vitor Leal',
      cpf: '05455595024',
      email: `${Math.random().toString(36).substr(2, 5)}@gmail.com`,
      phone: '61998875641',
      secondaryPhone: '61996687342',
      office: 'Policial',
      location: '6089c3538dfebe44555bc17e',
      address: 'Aguas Claras',
      userID: '6089c3538dfebe00555bc17e'
    };
    const createClient = await request(app).post('/clients/create/').set('x-access-token', token).send(client);
    const res = await request(app).get(`/clients/history/${createClient.body._id}`).set('x-access-token', token);
    expect(res.body[0].label).toBe('created');
    expect(res.body[0].user.name).toBe('Julia Batista');
    done();
  });

  it('Get client history error', async (done) => {
    const error = { message: 'Client not found' }
    const res = await request(app).get(`/clients/history/123`).set('x-access-token', token);
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ "message": "Client not found" });
    done();
  });

  it('Post feature', async (done) => {
    const res = await request(app).post('/feature/create/').set('x-access-token', token).send(feature);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(feature.name);
    expect(res.body.description).toBe(feature.description);
    expect(res.body.color).toBe(feature.color);
    featureID = res.body._id;
    done();
  });

  it('Post feature with invalid name', async (done) => {
    const invalidFeature = {
      name: '',
      description: 'privilegs',
      color: 'blue',
    };
    const res = await request(app).post('/feature/create/').set('x-access-token', token).send(invalidFeature);
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ "message": ["invalid name"] });
    done();
  });

  it('Post invalidFeature with invalid description', async (done) => {
    const invalidFeature = {
      name: 'familiar',
      description: '',
      color: 'yellow',
    }
    const res = await request(app).post('/feature/create/').set('x-access-token', token).send(invalidFeature);
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ "message": ['invalid description'] });
    done();
  });

  it('Post feature with invalid color', async (done) => {
    const invalidFeature = {
      name: 'VIP',
      description: 'very important member',
      color: '',
    }
    const res = await request(app).post('/feature/create/').set('x-access-token', token).send(invalidFeature);
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ "message": ['invalid color'] });
    done();
  });

  it('Post feature invalid token', async (done) => {
    const res = await request(app).post('/feature/create/').set('x-access-token', 'invalidToken').send(feature);
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ "auth": false, "message": "The token could not be authenticated." })
    done();
  });

  it('Post feature without token', async (done) => {
    const res = await request(app).post('/feature/create/').send(feature);
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ "auth": false, "message": "No token was provided." })
    done();
  });

  it('Get feature', async (done) => {
    const res = await request(app).get('/features/').set('x-access-token', token);
    expect(res.statusCode).toBe(200);
    const lastIdx = res.body.length - 1;
    expect(res.body[lastIdx].name).toBe(feature.name);
    expect(res.body[lastIdx].description).toBe(feature.description);
    expect(res.body[lastIdx].color).toBe(feature.color);
    done();
  });

  it('Get feature with invalid token', async (done) => {
    const res = await request(app).get('/features/').set('x-access-token', 'invalidToken');
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ "auth": false, "message": "The token could not be authenticated." })
    done();
  });

  it('Get feature without token', async (done) => {
    const res = await request(app).get('/features/');
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ "auth": false, "message": "No token was provided." })
    done();
  });

  it('Put feature', async (done) => {
    const res = await request(app).put(`/feature/update/${featureID}`).set('x-access-token', token).send(editFeature);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(editFeature.name);
    expect(res.body.description).toBe(editFeature.description);
    expect(res.body.color).toBe(editFeature.color);
    done();
  });

  it('Put feature with invalids inputs', async (done) => {
    const editFeatureInvalid = {
      name: '',
      description: '',
      color: '',
    }
    const res = await request(app).put(`/feature/update/${featureID}`).set('x-access-token', token).send(editFeatureInvalid);
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ "message": ['invalid name', 'invalid description', 'invalid color'] });
    done();
  });

  it('Put feature with invalid token', async (done) => {
    const res = await request(app).put(`/feature/update/${featureID}`).set('x-access-token', 'invalidToken').send(editFeature);
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ "auth": false, "message": "The token could not be authenticated." })
    done();
  });

  it('Put feature without token', async (done) => {
    const res = await request(app).put(`/feature/update/${featureID}`).send(editFeature);
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ "auth": false, "message": "No token was provided." })
    done();
  });

  it('Put feature with invalid ID', async (done) => {
    const res = await request(app).put(`/feature/update/false`).set('x-access-token', token).send(editFeature);
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ "message": "Invalid ID" })
    done();
  });

  it('Get features by using ID', async (done) => {
    const res = await request(app).post('/featuresbyid/').set('x-access-token', token).send({ featuresList: [featureID] });
    expect(res.statusCode).toBe(200);
    expect(res.body[res.body.length - 1].name).toBe(editFeature.name);
    expect(res.body[res.body.length - 1].description).toBe(editFeature.description);
    expect(res.body[res.body.length - 1].color).toBe(editFeature.color);
    done();
  });

  it('Get features by using invalid ID', async (done) => {
    const res = await request(app).post('/featuresbyid/').set('x-access-token', token).send({ featuresList: [123] });
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ "message": "Invalid ID" })
    done();
  });

  it('desactive feature', async (done) => {
    const res = await request(app).patch(`/feature/desactive/${featureID}`).set('x-access-token', token);
    expect(res.statusCode).toBe(200);
    expect(res.body.active).toBe(false);
    done();
  });

  it('desactive feature with invalid id', async (done) => {
    const res = await request(app).patch(`/feature/desactive/invalidId`).set('x-access-token', token);
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ "message": "Invalid ID" });
    done();
  });

  it('delete feature', async (done) => {
    const res = await request(app).delete(`/feature/delete/${featureID}`).set('x-access-token', token);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ "message": "success" });
    done();
  });

  it('delete feature with invalid ID', async (done) => {
    const res = await request(app).delete('/feature/delete/false').set('x-access-token', token);
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ "message": "Invalid ID" });
    done();
  });

  // Testes de lotação
  it('Create a lotacao', async (done) => {
    const res = await request(app).post('/lotacao/create/').set('x-access-token', token).send({
      name: "1° DP",
      description: "1° DP de Goias"
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

afterAll(async (done) => {
  done();
  await request(app).delete('/lotacao/create/').set('x-access-token', token).send(lotacao);
  await request(app).delete('/clients/create/').set('x-access-token', token).send(client1);
  await request(app).delete('/clients/create/').set('x-access-token', token).send(client2);
  await request(app).delete('/clients/create/').set('x-access-token', token).send(client3);
  await request(app).delete('/clients/create/').set('x-access-token', token).send(client4);
  await request(app).delete('/clients/create/').set('x-access-token', token).send(client5);
});

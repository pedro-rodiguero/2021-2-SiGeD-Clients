const Client = require("../Models/ClientSchema.js");
const db = require("../config/dbConnect");

const clients = [
    new Client({
        name: 'Cliente Um',
        cpf: '58714685000',
        email: 'um@gmail.com',
        phone: '61988884401',
        secondaryPhone: '61988884410',
        office: 'Policial',
        location: '6089c3538dfebe44555bc17e',
        address: 'Brasília',
        userID: '6089c3538dfebe00555bc17e'
      }),
      new Client ({
        name: 'Cliente Dois',
        cpf: '96731355097',
        email: 'dois@gmail.com',
        phone: '61988884402',
        secondaryPhone: '61988884420',
        office: 'Policial',
        location: '6089c3538dfebe44555bc17e',
        address: 'Brasília',
        userID: '6089c3538dfebe00555bc17e'
      }),
      new Client ({
        name: 'Cliente Três',
        cpf: '52062057024',
        email: 'tres@gmail.com',
        phone: '61988884403',
        secondaryPhone: '61988884430',
        office: 'Policial',
        location: '6089c3538dfebe44555bc17e',
        address: 'Brasília',
        userID: '6089c3538dfebe00555bc17e'
      }),
      new Client( {
        name: 'Cliente Quatro',
        cpf: '71104219026',
        email: 'quatro@gmail.com',
        phone: '61988884404',
        secondaryPhone: '61988884440',
        office: 'Policial',
        location: '6089c3538dfebe44555bc17e',
        address: 'Brasília',
        userID: '6089c3538dfebe00555bc17e'
      }),
      new Client ({
        name: 'Cliente Cinco',
        cpf: '21442505028',
        email: 'cinco@gmail.com',
        phone: '61988884405',
        secondaryPhone: '61988884450',
        office: 'Policial',
        location: '6089c3538dfebe44555bc17e',
        address: 'Brasília',
        userID: '6089c3538dfebe00555bc17e'
      }),
];

db.on("error", console.log.bind(console, 'Error on connecting to MongoDB'));
db.once("open", () => {
  console.log('MongoDB is connected');
})

const clientsLength = clients.length;

clients.forEach(async (client, index) => {
  try {
    const result = await client.save();
    if (index === clientsLength - 1) {
      console.log("Clients seeds done!");
      db.close();
    }
  } catch (error) {
    const err = new Error(`${error?.message}`);
    console.log(`Client seed failed - ${err}`);
    db.close();
    process.exit(0);
  }
});

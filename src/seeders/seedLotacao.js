const Lotacao = require("../Models/LotacaoSchema.js");
const db = require("../config/dbConnect");

const lotacoes = [
    new Lotacao ({
        name: "1° DP",
        description: "1° DP de go",
        lotacaoID: "6089c3538dfebe44555bc17e"
      }),
    new Lotacao ({
        name: "2° DP",
        description: "2° DP de go",
        lotacaoID: "6089c3538dfebe44555bc17f"
      }),
];

db.on("error", console.log.bind(console, 'Error on connecting to MongoDB'));
db.once("open", () => {
  console.log('MongoDB is connected');
})

const clientsLength = lotacoes.length;

lotacoes.forEach(async (lotacao, index) => {
  try {
    const result = await lotacao.save();
    if (index === clientsLength - 1) {
      console.log("Lotacoes seeds done!");
      db.close();
    }
  } catch (error) {
    const err = new Error(`${error?.message}`);
    console.log(`Lotacao seed failed - ${err}`);
    db.close();
    process.exit(0);
  }
});

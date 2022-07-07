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

const lotacoesLength = lotacoes.length;

lotacoes.forEach(async (user, index) => {
  await user.save((err, result) => {
    try {
      if (err) throw new Error(`${err?.message}`);
      if (index === lotacoesLength - 1) {
        console.log("DONE!");
        db.close();
      }
    } catch(err) {
      console.log(`Failed to seed lotacoes ${err}`);
      db.close();
      process.exit(0);
    }
  });
});


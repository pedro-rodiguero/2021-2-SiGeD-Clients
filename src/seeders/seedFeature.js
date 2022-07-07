const Feature = require("../Models/FeatureSchema.js");
const db = require("../config/dbConnect");

const features = [
    new Feature ({
        name: 'old',
        description: 'privilegs',
        color: 'blue',
      }),
    new Feature ({
        name: 'sick',
        description: 'rest in peace',
        color: 'black',
      }),
];

db.on("error", console.log.bind(console, 'Error on connecting to MongoDB'));
db.once("open", () => {
  console.log('MongoDB is connected');
})

const featuresLength = features.length;

features.forEach(async (user, index) => {
  await user.save((err, result) => {
    try {
      if (err) throw new Error(`${err?.message}`);
      if (index === featuresLength - 1) {
        console.log("DONE!");
        db.close();
      }
    } catch(err) {
      console.log(`Failed to seed features ${err}`);
      db.close();
      process.exit(0);
    }
  });
});


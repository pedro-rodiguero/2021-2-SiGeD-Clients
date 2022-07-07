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

features.forEach(async (feature, index) => {
  try {
    const result = await feature.save();
    if (index === featuresLength - 1) {
      console.log("Features seeds done!");
      db.close();
    }
  } catch (error) {
    const err = new Error(`${error?.message}`);
    console.log(`Feature seed failed - ${err}`);
    db.close();
    process.exit(0);
  }
});

const Cargo = require("../Models/CargoSchema.js");
const db = require("../config/dbConnect.js");

const cargos = [
  new Cargo({
    name: "Cargo 1",
    description: "Cargo de teste 1",
    invalidField: "should not be saved",
  }),
  new Cargo({
    name: "Cargo 2",
    description: "Cargo de teste 2"
  }),
  new Cargo({
    name: "Cargo 3",
    description: "Cargo de teste 3"
  }),
  new Cargo({
    name: "Cargo 4",
    description: "Cargo de teste 4"
  }),
  new Cargo({
    name: "Cargo 5",
    description: "Cargo de teste 5"
  }),
];

db.on("error", console.log.bind(console, 'Error on connecting to MongoDB'));
db.once("open", () => {
  console.log('MongoDB is connected');
})

cargos.forEach(async (cargo, index) => {
  try {
    const result = await cargo.save();
    if (index === cargos.length - 1) {
      console.log("Cargos seeds done!");
      db.close();
    }
  } catch (error) {
    const err = new Error(`${error?.message}`);
    console.log(`Cargo seed failed - ${err}`);
    db.close();
    process.exit(0);
  }
});
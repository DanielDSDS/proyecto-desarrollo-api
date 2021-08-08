const db = require("../db");

class UsersController {
  //Insert a Country
  async createUser(req, res) {
    try {
      const { name } = req.body;
      await db
        .insert([{ name: name }])
        .into("country")
        .returning("*")
        .then((countries) => res.status(200).json(countries));
    } catch (err) {
      res.status(400).json("Error while trying to insert a country");
      console.error(err);
    }
  }
}

exports.CountryController = CountryController()

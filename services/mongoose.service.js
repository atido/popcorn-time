class MongooseService {
  constructor(Model) {
    this.model = Model;
  }

  create(body) {
    return this.model.create(body);
  }

  delete(id) {
    return this.model.findByIdAndDelete(id).exec();
  }

  findOne(query) {
    return this.model.findOne(query).exec();
  }

  findOneAndUpdate(query, body, options = { new: true }) {
    return this.model.findOneAndUpdate(query, body, options).exec();
  }

  findById(id) {
    return this.model.findById(id).exec();
  }

  update(id, body, options = { new: true }) {
    return this.model.findByIdAndUpdate(id, body, options).exec();
  }
}

module.exports = MongooseService;

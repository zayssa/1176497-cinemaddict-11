export default class Store {
  constructor(storage) {
    this._storage = storage;
  }

  getData(key) {
    return JSON.parse(this._storage.getItem(key));
  }

  setData(key, data) {
    this._storage.setItem(key, JSON.stringify(data));
  }
}

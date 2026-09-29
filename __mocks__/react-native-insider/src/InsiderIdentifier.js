// The real class drops identifiers when the native module is absent, which it always is under Jest.
class RNInsiderIdentifier {
  constructor() {
    this.identifiers = {};
  }

  addEmail(email) {
    this.identifiers.addEmail = email;
    return this;
  }
}

module.exports = { __esModule: true, default: RNInsiderIdentifier };

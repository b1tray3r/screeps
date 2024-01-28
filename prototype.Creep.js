// \screeps

module.exports = function () {
  Creep.prototype.work = function () {
    let role = require('role.' + this.memory.role);
    role.run(this);
  };
};

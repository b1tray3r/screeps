// \screeps

require("prototype.Spawn")();
require("prototype.Creep")();
require("prototype.Controller")();

Memory.rooms = {};
for (var name in Game.rooms) {
  let room = Game.rooms[name];
  Memory.rooms[name] = {mustBuildRoads: true};
}

module.exports.loop = function () {
  for (var name in Game.rooms) {
    let room = Game.rooms[name];

    room.controller.visualize();
    room.controller.planRoads();

    room.controller.queueCreep();

    //room.controller.removeConstructionSites();
  }

  for (var creepName in Game.creeps) {
    let creep = Game.creeps[creepName];
    creep.work();
  }
};

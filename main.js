// \screeps

require('prototype.Spawn')();
require('prototype.Creep')();

module.exports.loop = function () {
  for (var spawnName in Game.spawns) {
    let spawn = Game.spawns[spawnName];
    let next = spawn.analyze();

    if (next){
      let name = spawn.spawnCreep(next.body, next.memory.role + Game.time, {
        memory: {
          role: next.memory.role,
          working: next.memory.working,
        },
      });
    }

    for (var creepName in Game.creeps) {
      let creep = Game.creeps[creepName];
      creep.work();
    }
  }
}


// \screeps

require("prototype.Spawn")();
require("prototype.Creep")();

module.exports.loop = function () {
  for (var spawnName in Game.spawns) {
    let spawn = Game.spawns[spawnName];
    let next = spawn.analyze();

    if (next) {
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

    const room = spawn.room;
    let spawnLocation = spawn.pos;
    let controllerLocation = spawn.room.controller.pos;

    let path = Game.rooms[spawn.room.name].findPath(
      spawnLocation,
      controllerLocation,
      { ignoreCreeps: true }
    );
    for (let i = 0; i < path.length; i++) {
      let pos = path[i];

      room.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD);
    }

    let energySources = spawn.room.find(FIND_SOURCES);
    for (let i = 0; i < energySources.length; i++) {
      let pos = energySources[i].pos;
      let path = Game.rooms[spawn.room.name].findPath(spawnLocation, pos, {
        ignoreCreeps: true,
      });

      for (let i = 0; i < path.length; i++) {
        let pos = path[i];
        room.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD);
      }
    }

    let minerals = spawn.room.find(FIND_MINERALS);
    for (let i = 0; i < minerals.length; i++) {
      let pos = minerals[i].pos;
      let path = room.findPath(spawnLocation, pos, {
        ignoreCreeps: true,
      });

      for (let i = 0; i < path.length; i++) {
        let pos = path[i];
        room.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD);
      }
    }

    let flags = room.find(FIND_FLAGS);
    for (let flag of flags) {
      if (flag.name === "E") {
        let x = flag.pos.x;
        let y = flag.pos.y;

        for (let i = x+1; i <= x + 3; i++) {
          for (let j = y+1; j <= y + 3; j++) {
            room.createConstructionSite(i, j, STRUCTURE_EXTENSION);
          }
        }

        let path = room.findPath(spawn.pos, flag.pos, {
          ignoreCreeps: true,
        });

        for (let i = 0; i < path.length; i++) {
          let pos = path[i];
          room.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD);
        }

        flag.remove();
      }
    }

    //let constructionSites = spawn.room.find(FIND_CONSTRUCTION_SITES);
    //for (let constructionSite of constructionSites) {
    //  constructionSite.remove();
    //}
  }
};

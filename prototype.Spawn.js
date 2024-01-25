module.exports = function () {
  Spawn.prototype.getNextSpawn = function (controllerLevel) {
    const creepDefs = {
      harvester: {
        memory: { role: "harvester", working: false },
        level: {
          1: { body: [WORK, CARRY, MOVE], amount: 8 },
          2: { body: [WORK, WORK, CARRY, MOVE], amount: 8 },
          2: { body: [WORK, WORK, CARRY, MOVE], amount: 8 },
          2: { body: [WORK, WORK, CARRY, MOVE], amount: 8 },
          5: { body: [WORK, WORK, WORK, WORK, MOVE], amount: 4},
          6: { body: [WORK, WORK, WORK, WORK, MOVE], amount: 4},
          7: { body: [WORK, WORK, WORK, WORK, MOVE], amount: 4},
          8: { body: [WORK, WORK, WORK, WORK, MOVE], amount: 4},
        }
      },
      hauler: {
        memory:  { role: "hauler", working: false,},
        level: {
          1: { body: [], amount: 0 },
          2: { body: [], amount: 0 },
          3: { body: [], amount: 0 },
          4: { body: [], amount: 0 },
          5: { body: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], amount: 6},
          6: { body: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], amount: 6},
          7: { body: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], amount: 6},
          8: { body: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], amount: 6},
        }
      },
      upgrader: {
        memory:  { role: "upgrader", working: false,},
        level: {
          1: { body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE], amount: 2},
          2: { body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE], amount: 2},
          3: { body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE], amount: 2},
          4: { body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE], amount: 2},
          5: { body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE], amount: 2},
          6: { body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE], amount: 2},
          7: { body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE], amount: 2},
          8: { body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE], amount: 2},
        }
      },
    };

    for (let role in creepDefs){
      let creeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);
      let desired = creepDefs[role].level[controllerLevel].amount;
      
      if (desired == 0) {
        continue;
      }
    
      let body = creepDefs[role].level[controllerLevel].body;

      if (creeps.length < desired){
        return {memory: creepDefs[role].memory, body: body};
      }
    }
  };
};
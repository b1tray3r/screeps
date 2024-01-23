// \screeps

//const TYPE_HARVESTER = 'harvester';
//
//harvester = {
//  memory: {'role': TYPE_HARVESTER},
//  body: [WORK,CARRY,MOVE],
//  run: function(creep) {
//    if (creep.carry.energy < creep.carryCapacity) {
//      var sources = creep.room.find(FIND_SOURCES);
//
//      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
//        creep.moveTo(sources[0]);
//      }
//    } else {
//      var targets = creep.room.find(FIND_STRUCTURES, {
//        filter: (structure) => {
//          return (structure.structureType == STRUCTURE_EXTENSION ||
//                  structure.structureType == STRUCTURE_SPAWN) &&
//            structure.energy < structure.energyCapacity;
//        }
//      });
//
//      if (targets.length > 0) {
//        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
//          creep.moveTo(targets[0]);
//        }
//      }
//    }
//  }
//}

module.exports = function () {
  Creep.prototype.work = function () {
    let types = [
      'harvester',
      'upgrader',
      'builder',
      'repairer',
      'carrier',
    ]
    if (this.store.energy == 0) {
      this.memory.working = true;
    }else if (this.store.energy == this.store.getCapacity()){
      this.memory.working = false;
    }

    let isWorking = this.memory.working;

    if (isWorking) {
      source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

      if (this.harvest(source) == ERR_NOT_IN_RANGE) {
        this.moveTo(source);
      }
    } else {
      let target = this.getTarget(this.memory.role);

      if (this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        this.moveTo(target);
      }
    }
  };

  Creep.prototype.getTarget = function (role) {
    switch (role) {
      case "harvester":
        let target = this.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (s) => {
            return (
              (s.structureType == STRUCTURE_EXTENSION ||
                s.structureType == STRUCTURE_SPAWN) &&
              s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            );
          },
        });
        if (target !== null)
        {
          return target;
        }
      default:
        return this.room.controller;
    }
  }
};

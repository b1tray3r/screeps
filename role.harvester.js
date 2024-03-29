module.exports = {
  isWorking: function(creep) {
    if (creep.store.energy == 0) {
      creep.memory.working = true;
    }else if (creep.store.energy == creep.store.getCapacity()){
      creep.memory.working = false;
    }

    return creep.memory.working;
  },

  getTarget: function(creep) {
    let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: (s) => {
        return (
          (s.structureType == STRUCTURE_EXTENSION ||
            s.structureType == STRUCTURE_SPAWN) &&
            s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        );
      },
    });

    return target;
  },

  run: function(creep) {
    if (this.isWorking(creep)) {
      source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    } else {
      let target = this.getTarget(creep);

      if(!target){
        target = creep.room.controller;
      }

      if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
    }
  }
}

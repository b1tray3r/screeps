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
    return creep.room.controller;
  },

  run: function(creep) {
    if (this.isWorking(creep)) {
      source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    } else {
      let target = this.getTarget(creep);

      if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
    }
  }
}

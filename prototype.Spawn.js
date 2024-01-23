module.exports = function () {
  Spawn.prototype.analyze = function () {
    // run garbage collection
    if (Game.time % 100 == 0) {
      for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
          delete Memory.creeps[name];
        }
      }
    }

    if (this.spawning) {
      var spawningCreep = Game.creeps[this.spawning.name];
      this._say("🛠️");
      return;
    }

    return this.getNextSpawn();
  };

  Spawn.prototype._say = function (message) {
    this.room.visual.text(message, this.pos.x + 1, this.pos.y, {
      align: "left",
      opacity: 0.8,
    });
  };

  Spawn.prototype.getNextSpawn = function () {
    let queue = this.getQueue();

    for (var role in queue) {
      let creep = queue[role];

      let creeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);

      if (creeps.length < creep.count) {
        this._say("🛠️");
        return {
          body: creep.body,
          memory: creep.memory,
        };
      }
    }
  };

  Spawn.prototype.getQueue = function () {
    const queue = {
      1: {
        harvester: {
          count: 10,
          body: [WORK, CARRY, MOVE],
          memory: { role: "harvester", working: false },
        },
        upgrader: {
          count: 1,
          body: [WORK, CARRY, MOVE],
          memory: { role: "upgrader", working: false },
        },
      },
      2: {
        harvester: {
          count: 10,
          body: [WORK, CARRY, MOVE, MOVE],
          memory: { role: "harvester", working: false },
        },
        upgrader: {
          count: 2,
          body: [WORK, CARRY, CARRY, MOVE],
          memory: { role: "upgrader", working: false },
        },
      },
      3: {
        harvester: {
          count: 10,
          body: [WORK, CARRY, MOVE, MOVE],
          memory: { role: "harvester", working: false },
        },
        upgrader: {
          count: 2,
          body: [WORK, CARRY, CARRY, MOVE],
          memory: { role: "upgrader", working: false },
        },
      },
      4: {
        harvester: {
          count: 10,
          body: [WORK, CARRY, MOVE, MOVE],
          memory: { role: "harvester", working: false },
        },
        upgrader: {
          count: 2,
          body: [WORK, CARRY, CARRY, MOVE],
          memory: { role: "upgrader", working: false },
        },
      },
      5: {
        harvester: {
          count: 10,
          body: [WORK, CARRY, MOVE, MOVE],
          memory: { role: "harvester", working: false },
        },
        upgrader: {
          count: 2,
          body: [WORK, CARRY, CARRY, MOVE],
          memory: { role: "upgrader", working: false },
        },
      },
      6: {
        harvester: {
          count: 10,
          body: [WORK, CARRY, MOVE, MOVE],
          memory: { role: "harvester", working: false },
        },
        upgrader: {
          count: 2,
          body: [WORK, CARRY, CARRY, MOVE],
          memory: { role: "upgrader", working: false },
        },
      },
    };

    let controllerLevel = this.room.controller.level;

    return queue[controllerLevel];
  };
};

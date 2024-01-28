module.exports = function () {
  StructureController.prototype.visualize = function () {
    if (Game.time % 100 == 0) {
      for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
          delete Memory.creeps[name];
        }
      }
    }

    if (this.ticksToDowngrade < 1000) {
      this.room.visual.text("🔴", this.pos.x - 0.44, this.pos.y + 0.22, {
        align: "left",
        opacity: 0.8,
      });
    }
    if (this.ticksToDowngrade > 1000) {
      this.room.visual.text("🟡", this.pos.x - 0.44, this.pos.y + 0.22, {
        align: "left",
        opacity: 0.8,
      });
    }
    if (this.ticksToDowngrade > 2000) {
      this.room.visual.text("🟢", this.pos.x - 0.44, this.pos.y + 0.22, {
        align: "left",
        opacity: 0.8,
      });
    }
  };

  StructureController.prototype.removeConstructionSites = function () {
    let spawn = this.room.find(FIND_MY_SPAWNS)[0];
    let constructionSites = spawn.room.find(FIND_CONSTRUCTION_SITES);
    for (let constructionSite of constructionSites) {
      constructionSite.remove();
    }
  };

  StructureController.prototype.planRoads = function () {
    if (Memory.rooms[this.room.name].mustBuildRoads == undefined) {
      Memory.rooms[this.room.name].mustBuildRoads = true;
    }

    if (!Memory.rooms[this.room.name].mustBuildRoads) {
      return;
    }

    let spawnLocation = this.room.find(FIND_MY_SPAWNS)[0].pos;
    let controllerLocation = this.pos;

    let path = Game.rooms[this.room.name].findPath(
      spawnLocation,
      controllerLocation,
      { ignoreCreeps: true }
    );
    for (let i = 0; i < path.length; i++) {
      let pos = path[i];

      this.room.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD);
    }

    let energySources = this.room.find(FIND_SOURCES);
    for (let i = 0; i < energySources.length; i++) {
      let pos = energySources[i].pos;
      let path = Game.rooms[this.room.name].findPath(spawnLocation, pos, {
        ignoreCreeps: true,
      });

      for (let i = 0; i < path.length; i++) {
        let pos = path[i];
        this.room.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD);
      }
    }
    
    for (let i = 0; i < energySources.length; i++) {
      let pos = energySources[i].pos;
      let path = Game.rooms[this.room.name].findPath(controllerLocation, pos, {
        ignoreCreeps: true,
      });

      for (let i = 0; i < path.length; i++) {
        let pos = path[i];
        this.room.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD);
      }
    }

    let extensions = this.room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_EXTENSION } });
    for (let i = 0; i < extensions.length; i++) {
      let pos = extensions[i].pos;
      let path = Game.rooms[this.room.name].findPath(controllerLocation, pos, {
        ignoreCreeps: true,
      });

      for (let i = 0; i < path.length; i++) {
        let pos = path[i];
        this.room.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD);
      }
    }

    let minerals = this.room.find(FIND_MINERALS);
    for (let i = 0; i < minerals.length; i++) {
      let pos = minerals[i].pos;
      let path = this.room.findPath(spawnLocation, pos, {
        ignoreCreeps: true,
      });

      for (let i = 0; i < path.length; i++) {
        let pos = path[i];
        this.room.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD);
      }
    }

    Memory.rooms[this.room.name].mustBuildRoads = false;
  };

  StructureController.prototype.planExtensions = function () {
    let flag = Game.flags["extensions"];
    if (!flag) {
      return;
    }
    for (let j = 0; j <= 5; j++) {
      for (let i = 0; i <= 5; i++) {
        let x = flag.pos.x + i;
        let y = flag.pos.y + j;
        this.room.createConstructionSite(x, y, STRUCTURE_EXTENSION);
      }
    }
  };

  StructureController.prototype.queueCreep = function () {
    let spawns = this.room.find(FIND_MY_SPAWNS);
    for (const spawn of spawns) {
      let next = spawn.getNextSpawn(this.level);

      if (next) {
        spawn.spawnCreep(next.body, next.memory.role + Game.time, {
          memory: {
            role: next.memory.role,
            working: next.memory.working,
          },
        });

      }
    }
  };
};

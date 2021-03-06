class Tree {
    constructor(grid, startPos, destinationPos) {
        this.grid = grid;
        this.visited = new Set;
        this.orderedVisit = [];
        this.startPos = startPos;
        this.destinationPos = destinationPos;
        this.startTile = this.grid.getTile(this.startPos);
        this.grid.placeStartTile(this.startPos);
        this.solvable = false;
    }

    validPos(pos) {
        if( this.grid.getTile(pos).className === "wall"){
            return false;
        }
        if (this.grid.validPos(pos) && !this.visited.has(pos.toString())) {
            return true;
        }
        return false;
    }

    createTree() {
        const queue = [this.startTile];
        this.visited.add(this.startTile.pos.toString());

        while (!queue.length < 1) {
            const curTile = queue.shift();
            const tiles = this.grid.adjacentTiles(curTile.pos);
            for (let i = 0; i < tiles.length; i++) {
                if (this.solvable === false && tiles[i].toString() === this.destinationPos.toString()){
                    this.solvable = true;
                }

                if (this.validPos(tiles[i])) {
                    const tile = this.grid.getTile(tiles[i]);
                    tile.assignParent(curTile);
                    queue.push(tile);
                    this.visited.add(tile.pos.toString());
                }
            }
        }
    }
}

module.exports = Tree;

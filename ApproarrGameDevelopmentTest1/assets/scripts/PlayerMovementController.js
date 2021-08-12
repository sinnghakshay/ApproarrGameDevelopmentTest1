var setLevel = require("SetLevelScreen");

cc.Class({
    extends: cc.Component,

    properties: {
        setLevel: {
            default: null,
            type: setLevel,
        },

        currentPos: null,

        targetPos: null,

        nodeArr: null,

        validMoveArr: [],


    },

    playerMovementInfo: function (levelInfo, nodeArr) {
        // To initialise the player at level start

        console.log(levelInfo);
        console.log(Number(levelInfo.StartIndex), levelInfo.StartIndex);
        this.levelInfo = levelInfo;
        this.currentPos = Number(levelInfo.StartIndex);
        this.nodeArr = nodeArr;
    },

    playerMakesMove: function (event, customEventData) {
        // Called when user clicks on any of the matrix nodes to make a move

        this.makeMove(this.nodeArr, this.currentPos, Number(customEventData));
    },

    makeMove: function (nodeArr, playerCurrentPos, playerTargetPos) {
        // Called when a player tries to make move on the matrix

        var validMove = this.validatePLayerMove(playerTargetPos);
        console.log(nodeArr, playerCurrentPos, playerTargetPos, validMove);

        if (validMove) {
            this.node.setPosition(nodeArr[playerTargetPos - 1]);
            this.setLevel.drawCircle(nodeArr[playerCurrentPos - 1], cc.Color.GREEN);
            this.levelInfo.BlockerPair.push([playerCurrentPos, playerTargetPos]);
            for (let index = 0; index < this.validMoveArr.length; index++) {
                this.levelInfo.BlockerPair.push([this.validMoveArr[index], this.currentPos]);
            }
            this.currentPos = playerTargetPos;
        }

    },

    validatePLayerMove: function (targetPos) {
        // Validates player move that is it allowed or not

        this.validMoveArr = this.updateValidMoves(this.currentPos);
        this.checkBlocker(targetPos);
        for (let index = 0; index < this.validMoveArr.length; index++) {
            console.log(this.validMoveArr, targetPos, this.validMoveArr[index]);

            if (targetPos === this.validMoveArr[index]) {
                console.log("VALID MOVE", this.validMoveArr[index]);
                return true;
            }
            else { }

        }
        return false;


    },

    checkBlocker: function (targetPos) {
        // Checks that the move made is already blocked by the level blockers or not, and removes them from valid Move Array

        var flag;
        for (let i = 0; i < this.levelInfo.BlockerPair.length; i++) {
            console.log(this.levelInfo.BlockerPair[i][0], this.levelInfo.BlockerPair[i][1], this.currentPos, targetPos);
            if (this.levelInfo.BlockerPair[i][0] == this.currentPos && this.levelInfo.BlockerPair[i][1] == targetPos) {
                this.validMoveArr.splice(this.validMoveArr.indexOf(this.levelInfo.BlockerPair[i][1]), 1);
            }
            else if (this.levelInfo.BlockerPair[i][1] == this.currentPos && this.levelInfo.BlockerPair[i][0] == targetPos) {
                this.validMoveArr.splice(this.validMoveArr.indexOf(this.levelInfo.BlockerPair[i][0]), 1);
            }
        }
    },

    updateValidMoves: function (currentPos) {
        // Update list of valid moves that a player can make after making a move

        switch (currentPos) {
            case 1: return [2, 4, 5];

            case 2: return [1, 3, 4, 5, 6];

            case 3: return [2, 5, 6];

            case 4: return [1, 2, 5, 7, 8];

            case 5: return [1, 2, 3, 4, 6, 7, 8, 9];

            case 6: return [2, 3, 5, 8, 9];

            case 7: return [4, 5, 8];

            case 8: return [4, 5, 6, 7, 9];

            case 9: return [5, 6, 8];
        }
    },
});

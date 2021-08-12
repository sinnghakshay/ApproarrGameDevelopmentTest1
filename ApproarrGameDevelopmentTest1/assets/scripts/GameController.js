var setLevel = require("SetLevelScreen");
var playerMovement = require("PlayerMovementController");

cc.Class({
    extends: cc.Component,

    properties: {
        pos: {
            default: [],
            type: cc.Node
        },

        levelConfig: {
            default: null,
            type: cc.JsonAsset,
        },

        setLevel: {
            default: null,
            type: setLevel,
        },

        playerMovement: {
            default: null,
            type: playerMovement,
        },

        levelInfoLabel: {
            default: null,
            type: cc.Label,
        },

        resetBtn: {
            default: null,
            type: cc.Node,
        },

        nexttBtn: {
            default: null,
            type: cc.Node,
        },

        validMoveArr: [],

        levelInfo: null,

    },

    start() {

    },

    onLoad: function () {
        //Loads first screen of the game 

        this.getLevelConfiguration("1");
        
    },
    
    getLevelConfiguration: function (level) {
        // Fetch pre-defined level configuration from json file
        
        this.levelInfo = this.levelConfig.json;
        console.log(level, this.levelInfo);

        let newLevel =JSON.parse(JSON.stringify(this.levelInfo));
        if(level < 3){

            this.playerMove(newLevel[level]);
            
            this.setLevel.drawMatrix(newLevel[level], this.pos);
        }
    },

    playerMove: function (levelDetail) {
        // Passes information to PlayerMovementController class to initialise the player at level start 

        this.playerMovement.playerMovementInfo(levelDetail, this.pos);
    },
    
    onResetLevel: function (event, customEventData) {
        // Resets the current game level

        // console.log("ON RESET CALLED", customEventData, this.levelConfig.json);
        this.levelInfoLabel.string = "Level " + customEventData;
        this.getLevelConfiguration(customEventData);
    },

    onResetGame: function () {
        // Resets the entire game and you are back to level 1

        this.getLevelConfiguration("1");
        this.resetBtn.getComponent(cc.Button).clickEvents[0].customEventData = "1";
        this.levelInfoLabel.string = "Level 1";
    },

    onNext: function () {
        // Takes you to the next level of the game

        // console.log("ON NEXT CALLED", this.levelInfoLabel, data);
        var data = Number(this.resetBtn.getComponent(cc.Button).clickEvents[0].customEventData) + 1;
        if(data<3){
            this.resetBtn.getComponent(cc.Button).clickEvents[0].customEventData = data.toString();
            this.levelInfoLabel.string = "Level " + data.toString();

            this.getLevelConfiguration(data.toString());
        }
    },

    onPrevious: function () {
        // Takes you to the previous level of the game

        var data = Number(this.resetBtn.getComponent(cc.Button).clickEvents[0].customEventData) - 1;
        // console.log("ON NEXT CALLED", this.resetBtn.getComponent(cc.Button).clickEvents[0].customEventData, data);
        if(data > 0){
            this.resetBtn.getComponent(cc.Button).clickEvents[0].customEventData = data.toString();
            this.levelInfoLabel.string = "Level " + data.toString();

            this.getLevelConfiguration(data.toString());
        }
    },
    
});

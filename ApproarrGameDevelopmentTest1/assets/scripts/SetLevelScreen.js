cc.Class({
    extends: cc.Component,

    properties: {
        player: {
            default: null,
            type: cc.Node
        },

    },

    drawMatrix: function (matrixInfo, nodeArr) {
        // Draw basic game matrix with circles and square as per level design

        console.log(matrixInfo, nodeArr)
        var isEndPoint;
        for (let index = 0; index < 9; index++) {

            isEndPoint = matrixInfo.EndIndex == index + 1 ? true : false;
            this.drawNode(nodeArr[index], isEndPoint);
            nodeArr[index].children.forEach(element => {
                var ctx = element.getComponent(cc.Graphics);
                ctx.clear();

            });

        }
        for (let index = 0; index < matrixInfo.BlockerPair.length; index++) {

            this.drawBlockers(matrixInfo.BlockerPair[index], nodeArr);
        }


        // Draw player as forever rotating triangle
        this.player.setPosition(nodeArr[matrixInfo.StartIndex - 1]);
        this.drawTriangle(this.player);
    },

    drawNode: function (node, isEndPoint = false) {
        // Draw basic circles and square as per level design on a single node

        console.log(node, isEndPoint);
        if (isEndPoint == true) {
            this.drawSquare(node);
        }
        else {
            this.drawCircle(node, cc.Color.BLUE);
        }
    },

    drawBlockers: function (blockerPairArr, nodeArr) {
        // Draws blockers blocks between blocked node pairs

        var node = nodeArr[blockerPairArr[0] - 1].getChildByName((blockerPairArr[1]).toString());
        this.drawBlocker(node, cc.Color.RED);
    },

    drawCircle: function (node, color) {
        // Draws circle using cc.Graphics

        var ctx = node.getComponent(cc.Graphics);
        ctx.clear();
        ctx.circle(0, 0, 50);
        ctx.fillColor = color;
        ctx.fill();
    },

    drawSquare: function (node) {
        // Draws square using cc.Graphics

        var ctx = node.getComponent(cc.Graphics);
        ctx.clear();
        ctx.rect(-50, -50, 100, 100);
        ctx.fillColor = cc.Color.BLUE;
        ctx.fill();
    },

    drawTriangle: function (node) {
        // Draws triangle using cc.Graphics

        var ctx = node.getComponent(cc.Graphics);
        ctx.clear();
        ctx.moveTo(-50, -50);
        ctx.lineTo(50, -50);
        ctx.lineTo(50, 50);
        ctx.lineTo(-50, -50);
        ctx.fillColor = cc.Color.GREEN;
        ctx.fill();
        var repeat = cc.repeatForever(cc.rotateBy(1.0, 360));

        node.runAction(repeat);
    },

    drawBlocker: function (node, color) {
        // Draws blocker using cc.Graphics

        var ctx = node.getComponent(cc.Graphics);
        ctx.clear();
        ctx.rect(0, -15, 200, 30);
        ctx.fillColor = color;
        ctx.fill();
    },


});

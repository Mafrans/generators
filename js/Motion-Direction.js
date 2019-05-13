function generateCommands() {
    var template = $("#input-template").val();
    var precisionX = parseInt($("#input-precision-x").val());
    var precisionY = parseInt($("#input-precision-y").val());
    var magnitude = parseInt($("#input-magnitude").val());

    var commands = [];
    for(var xRot = -180; xRot < 180; xRot += precisionX) {
        for(var yRot = -180; yRot < 180; yRot += precisionY) {
            var minXRot = xRot - Math.floor(precisionX/2);
            var maxXRot = xRot + Math.ceil(precisionX/2);
            var minYRot = yRot - Math.floor(precisionY/2);
            var maxYRot = yRot + Math.ceil(precisionY/2);

            var xMotion = magnitude * Math.round(100 * Math.cos(deg2rad(yRot + 90))) / 100.0;
            var yMotion = magnitude * Math.round(100 * -Math.sin(deg2rad(xRot/2))*2) / 100.0;
            var zMotion = magnitude * Math.round(100 * Math.sin(deg2rad(yRot + 90))) / 100.0;

            var command = template
                .replace("%rot_x_min%", minXRot)
                .replace("%rot_x_max%", maxXRot)
                .replace("%rot_y_min%", minYRot)
                .replace("%rot_y_max%", maxYRot)
                .replace("%motion_x%", (xMotion - 0.01).toString().substr(0, 4))
                .replace("%motion_y%", (yMotion - 0.01).toString().substr(0, 4))
                .replace("%motion_z%", (zMotion - 0.01).toString().substr(0, 4));

            commands.push(command);

            console.log(xRot + ", " + yRot + ", " + command);
        }
    }

    $("#commandContainer").addClass("show");
    $("#commands").text(commands.join("\n"));
    textAreaAdjust($("#commands")[0]);
}

$(function () {
    recalculateCommandCount();
    $("#input-precision-x, #input-precision-y").on("input", function () {
        recalculateCommandCount();
    });
});

function recalculateCommandCount() {
    var precisionX = $("#input-precision-x").val();
    var precisionY = $("#input-precision-y").val();

    $("#command-count").text((360/precisionX) * (360/precisionY) + " Commands");
}

function textAreaAdjust(o) {
    o.style.height = "1px";
    o.style.height = (25+o.scrollHeight)+"px";
}

function deg2rad(angle) {
    return angle * (Math.PI / 180);
}
var str = "";
ws.onmessage = function (evt)
{
    str = evt.data;
    console.log(str);
    var res = str.split("?");
    recMessage.inst = res[0];

    switch (recMessage.getInst()) {
        case "db_allnode":
            if (requestMessage.getType() === 'db_allnode') {
                requestMessage.type = "";
                answer_db_allnode();
                recMessage.inst = "";
            }
            break;
        case "is_alive_io":
            if (requestMessage.getType() === 'is_alive_io') {
                requestMessage.type = "";
                answer_is_alive_io_test();
                recMessage.inst = "";
            }
            break;
        case "command_io":
            answer_command_io();
            recMessage.inst = "";
            break;
        case "user_trig":
            user_trig();
            recMessage.inst = "";
            break;

        default:

    }
};

function answer_db_allnode() {
    //console.log(str);
    var res = str.split("?");
    res.splice(res.length - 1, 1);
    res.splice(0, 1);
    powered.data([]);
    for (var i in res) {
        var node = res[i].split("+");
        //console.log(node);
        var xbeeAddr = node[0];
        var xbeeType = node[1];
        var xbeeStatus = node[2];

        /** if (xbeeType === deviceType.switch_3_Light_NoOutlet) {
         // switchInfo.address.push(xbeeAddr);            
         sw.add({xaddr: xbeeAddr, xtype: "switch_3_Light_NoOutlet"});
         
         }**/
        switch (xbeeType) {
            case deviceType.switch_1_Light_1_Outlet:
                sw.add({xaddr: xbeeAddr, xtype: xbeeType, xstatus: xbeeStatus, textInListView: "Switch 1 Light 1 Outlet"});
                break;
            case deviceType.switch_1_Light_NoOutlet:
                sw.add({xaddr: xbeeAddr, xtype: xbeeType, xstatus: xbeeStatus, textInListView: "Switch 1 Light 0 Outlet"});
                break;
            case deviceType.switch_3_Light_NoOutlet:
                sw.add({xaddr: xbeeAddr, xtype: xbeeType, xstatus: xbeeStatus, textInListView: "Switch 3 Light 0 Outlet"});
                break;
            case deviceType.switch_No_Light_2_Outlet:
                sw.add({xaddr: xbeeAddr, xtype: xbeeType, xstatus: xbeeStatus, textInListView: "Switch 0 Light 2 Outlet"});
                break;
            case deviceType.gate:
                gate.add({xaddr: xbeeAddr, xtype: xbeeType, xstatus: xbeeStatus, textInListView: "Gate"});
                break;

            default:
        }

        if (xbeeStatus === nodeStatus.online) {
            powered.add({xaddr: xbeeAddr, xtype: xbeeType, xsta: xbeeStatus});
        }
    }
    sw.fetch();
    powered.fetch();

    //powered.read();
}

function answer_is_alive_io() {
    sw3.data([]);
    var res = str.split("?");
    //res.splice(res.length - 1, 1);
    console.log(res[0]);
    console.log(res[1]);
    console.log(res[2]);
    //console.log(str);

    str = HexToBinary(res[2]);
    //str = "11111001";

    switch (switchInfo.type) {
        case deviceType.switch_1_Light_1_Outlet:
            str = str.substring(6, 8);
            switchPortNumber = 2;
            break;
        case deviceType.switch_1_Light_NoOutlet:
            str = str.substring(7, 8);
            switchPortNumber = 1;
            break;
        case deviceType.switch_3_Light_NoOutlet:
            str = str.substring(5, 8);
            switchPortNumber = 3;
            break;
        case deviceType.switch_No_Light_2_Outlet:
            str = str.substring(6, 8);
            switchPortNumber = 2;
            break;

        default:

    }

    //str = str.substring(5, 8);
    //var k = switchPortNumber;
    for (var i in str) {
        var dioStatus = str.charAt(i);

        if (dioStatus === "1") {
            var swCheck = "true";
        } else {
            var swCheck = "false";
        }
        var swid = "swid" + i;
        sw3.add({dioStatus: dioStatus, swCheck: swCheck, swid: swid, textInListView: "port " + i});

    }

    sw3.fetch();
}

function answer_is_alive_io_gate() {
    gate.data([]);
    var res = str.split("?");
    //res.splice(res.length - 1, 1);
    console.log(res[0]);
    console.log(res[1]);
    console.log(res[2]);
    console.log("qqqqqqqqqq");

    str = HexToBinary(res[2]);
    //str = "11111001";
    str = str.substring(4, 8);
    console.log(str + " aaaaaaa");

    //var k = switchPortNumber;
    for (var i in str) {
        var dioStatus = str.charAt(i);

        if (dioStatus === "1") {
            var gateCheck = "true";
        } else {
            var gateCheck = "false";
        }
        var gateid = "gateid" + i;
        gateStatus.add({dioStatus: dioStatus, gateCheck: gateCheck, gateid: gateid, textInListView: "gate " + i});

    }

    gateStatus.fetch();
}

function answer_command_io() {
    console.log("command_io complete " + str);
}

function user_trig() {

    var res = str.split("?");
    // sw3.data([]);
    recMessage.address = res[1];
    recMessage.io = res[3];
    recMessage.type = res[2];
    console.log("address " + recMessage.address);
    console.log("io " + recMessage.io);
    console.log("type " + recMessage.type);

    var ioBin = HexToBinary(recMessage.io);
    ioBin = ioBin.substring(3, 8);
    console.log(ioBin);
    res.splice(res.length - 1, 1);
    res.splice(0, 1);

    switch (recMessage.type) {
        case deviceType.switch_1_Light_1_Outlet:

            break;
        case deviceType.switch_1_Light_NoOutlet:

            break;
        case deviceType.switch_3_Light_NoOutlet:
            for (var i = 0; i < 3; i++) {
                console.log(ioBin[i]);
                if (ioBin[i] === '1') {
                    sw3.fetch(function () {
                        var dataItem = sw3.at(i);
                        dataItem.swCheck = "true";
                        dataItem.swid = i;

                    });
                } else {
                    sw3.fetch(function () {
                        var dataItem = sw3.at(i);
                        dataItem.swCheck = "false";
                        dataItem.swid = i;
                    });

                }
            }
            //sw3.fetch();
            //sw3.read();
            break;
        case deviceType.switch_No_Light_2_Outlet:
            break;
        case deviceType.gate:
            for (var i = 0; i < 5; i++) {
                console.log(ioBin[i]);
                if (ioBin[i] === '1') {
                    gateStatus.fetch(function () {
                        var dataItem = gateStatus.at(i);
                        dataItem.gateCheck = "true";
                        dataItem.gateid = i;

                    });
                } else {
                    gateStatus.fetch(function () {
                        var dataItem = gateStatus.at(i);
                        dataItem.gateCheck = "false";
                        dataItem.gateid = i;
                    });

                }
            }
            gateStatus.fetch();
            //gateStatus.read();
            break;

        default:

    }

}


function answer_is_alive_io_test() {

    var res = str.split("?");
    //res.splice(res.length - 1, 1);
    console.log(res[0]);
    console.log(res[1]);
    console.log(res[2]);
    //console.log(str);

    str = HexToBinary(res[2]);
    console.log(str);
    //str = res[2];
    //str = "11111001";

    switch (sendMessage.getType()) {
        case "is_alive_io":
            sw3.data([]);
            switch (switchInfo.type) {
                case deviceType.switch_1_Light_1_Outlet:
                    str = str.substring(6, 8);
                    switchPortNumber = 2;
                    break;
                case deviceType.switch_1_Light_NoOutlet:
                    str = str.substring(7, 8);
                    switchPortNumber = 1;
                    break;
                case deviceType.switch_3_Light_NoOutlet:
                    str = str.substring(5, 8);
                    switchPortNumber = 3;
                    break;
                case deviceType.switch_No_Light_2_Outlet:
                    str = str.substring(6, 8);
                    switchPortNumber = 2;
                    break;
                default:
            }
            for (var i in str) {
                var dioStatus = str.charAt(i);
                if (dioStatus === "1") {
                    var swCheck = "true";
                } else {
                    var swCheck = "false";
                }
                var swid = "swid" + i;
                sw3.add({dioStatus: dioStatus, swCheck: swCheck, swid: swid, textInListView: "port " + i});
            }
            sw3.fetch();
            break;
        case "is_alive_io_gate":
            str = str.substring(3, 8);
            console.log(str + " aaaaaaa");
            for (var i in str) {
                var dioStatus = str.charAt(i);
                if (dioStatus === "1") {
                    var gateCheck = "true";
                } else {
                    var gateCheck = "false";
                }
                var gateid = "gateid" + i;
                gateStatus.add({dioStatus: dioStatus, gateCheck: gateCheck, gateid: gateid, textInListView: "ประตู " + i});
            }
            gateStatus.fetch();
            break;
        default:
    }





    //str = str.substring(5, 8);
    //var k = switchPortNumber;

}
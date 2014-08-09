var str = "";
ws.onmessage = function(evt)
{
    str = evt.data;
    console.log(str);
    var res = str.split("?");
    recMessage.type = res[0];
    
    switch (recMessage.getType()) {
        case "db_allnode":
            answer_db_allnode();
            recMessage.type = "";
            break;
        case "is_alive_io":
            answer_is_alive_io();
            recMessage.type = "";
            break;
        case "command_io":
            answer_command_io();
            recMessage.type = "";
            break;

        default:

    }
};

function answer_db_allnode() {
    //console.log(str);
    var res = str.split("?");
    res.splice(res.length - 1, 1);
    for (var i in res) {
        var node = res[i].split("+");
        var xbeeAddr = node[0];
        var xbeeType = node[1];
        var xbeeStatus = node[2];

       /** if (xbeeType === deviceType.switch_3_Light_NoOutlet) {
            // switchInfo.address.push(xbeeAddr);            
            sw.add({xaddr: xbeeAddr, xtype: "switch_3_Light_NoOutlet"});
            
        }**/        
        switch (xbeeType) {
        case deviceType.switch_1_Light_1_Outlet:
            sw.add({xaddr: xbeeAddr, xtype: xbeeType, xstatus: xbeeStatus ,textInListView: "Switch 1 Light 1 Outlet"});
            break;
        case deviceType.switch_1_Light_NoOutlet:
            sw.add({xaddr: xbeeAddr, xtype: xbeeType, xstatus: xbeeStatus ,textInListView: "Switch 1 Light 0 Outlet"});
            break;
        case deviceType.switch_3_Light_NoOutlet:
            sw.add({xaddr: xbeeAddr, xtype: xbeeType, xstatus: xbeeStatus ,textInListView: "Switch 3 Light 0 Outlet"});
            break;
        case deviceType.switch_No_Light_2_Outlet:
            sw.add({xaddr: xbeeAddr, xtype: xbeeType, xstatus: xbeeStatus ,textInListView: "Switch 0 Light 2 Outlet"});
            break;

        default:
    }
        
        if(xbeeStatus === nodeStatus.online){
             powered.add({xaddr: xbeeAddr, xtype: xbeeType, xsta: xbeeStatus});
        }
    }
    sw.fetch();
    powered.fetch();
}

function answer_is_alive_io() {
    
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
            var swCheck = "false";
        } else {
            var swCheck = "true";
        }
        var swid = "swid" + i;
        sw3.add({dioStatus: dioStatus, swCheck: swCheck, swid: swid, textInListView: "port " + i});

    }

    sw3.fetch();
}

function answer_command_io(){
    console.log("command_io complete " + str);
}
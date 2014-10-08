var sendMessage = new function() {
    this.type = "";
    this.getType = function() {
        return this.type;
    };
};
var recMessage = new function() {
    this.inst = "";
    this.type = "";
    this.address = "";
    this.status = "";
    this.io = "";
    this.getType = function() {
        return this.type;
    };
    this.getInst = function() {
        return this.inst;
    };
};

var deviceType = new function() {
    this.switchNode = "0x30000";
    this.securityNode = "";
    this.gateNode = "";
    this.cameraNode = "";   
    this.switch_1_Light_NoOutlet = "0x3ff10";
    this.switch_3_Light_NoOutlet = "0x3ff30";    
    this.switch_1_Light_1_Outlet = "0x3ff11";
    this.switch_No_Light_2_Outlet = "0x3ff02";
    this.gate = "0x3ff90";
};

var nodeStatus = new function() {
    this.online = "1";
    this.offline = "0";

};


var sw = new kendo.data.DataSource();
var sw3 = new kendo.data.DataSource();
var powered = new kendo.data.DataSource();
var gate = new kendo.data.DataSource();
var gateStatus = new kendo.data.DataSource();



function HexToBinary(hex) {
    //var hexNumber = hex;
    var decNumber = parseInt(hex, 16);
    var bin = decNumber.toString(2);
    var len = bin.length;
    var zero = "0";
    
    for(var i=len;i < 8;i++){
        bin = zero.concat(bin);
    }
    return bin;

}

function BinaryToHex(bin) {
    var binaryNumber = bin;
    var decNumber = parseInt(binaryNumber, 2);
    var hexNumber = decNumber.toString(16).toUpperCase();
    return hexNumber;


}

function decConvertToBinary() {
    var numberValue = 10;
    var decNumber = Number(numberValue);
    return decNumber.toString(2).toUpperCase();


}

function hexConvertToDec() {
    var hexNumber = "A";
    var decNumber = parseInt(hexNumber, 16);
    return decNumber;

}

function decConvertToHex() {
    var numberValue = document.getElementById('NumberInput').value;
    var decNumber = Number(numberValue);
    var hexNumber = decNumber.toString(16).toUpperCase();

    document.getElementById('Result').value = hexNumber;
}

function binConvertToDec() {
    var binaryNumber = document.getElementById('NumberInput').value;
    var decNumber = parseInt(binaryNumber, 2);
    document.getElementById('Result').value = decNumber;
}
/** powered **/

/**end powered **/

/** switch **/
function homeLoad() {
    
       
}

function switchFile() {
    
}
/**end switch **/

/** switch 3 port**/

/**end switch 3 port**/
function HexToBinary(hex) {
    //var hexNumber = hex;
    var decNumber = parseInt(hex, 16);
    return decNumber.toString(2).toUpperCase();

}

function BinaryToHex(bin) {
    var binaryNumber = bin;
    var decNumber = parseInt(binaryNumber, 2);
    var hexNumber = decNumber.toString(16).toUpperCase();
    return hexNumber;


}

function ConvertToBinary() {
    var numberValue = 10;
    var decNumber = Number(numberValue);
    return decNumber.toString(2).toUpperCase();


}

function hexConvertToDec() {
    var hexNumber = "A";
    var decNumber = parseInt(hexNumber, 16);
    return decNumber;

}

function ConvertToHex() {
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
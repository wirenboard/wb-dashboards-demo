var emulator = require("device-emulator"); // подключаем модуль
var devices = [ // описываем устройства
    {
        "type": "WB-MAP3E",
        "address": 1,
        "emulators": [
            { "topicName": "Irms L1", "type": "sensor2Dec", "name": "Irms L1", "lastValue": 390, "min": 380, "max": 420, "interval": 3000 }, // interval (ms) >=1000 ms
            { "topicName": "Urms L1", "type": "sensor2Dec", "name": "Urms L1", "lastValue": 220, "min": 210, "max": 225, "interval": 3000 },
            { "topicName": "Phase angle L1", "type": "sensor2Dec", "name": "Phase angle L1", "lastValue": 5.05, "min": 4.80, "max": 5.10, "interval": 3000 },
            { "topicName": "Voltage angle L1", "type": "sensor2Dec", "name": "Phase angle L1", "lastValue": 0, "min": 0, "max": 0, "interval": 3000 },

            { "topicName": "Irms L2", "type": "sensor2Dec", "name": "Irms L2", "lastValue": 370, "min": 350, "max": 390, "interval": 3000 },
            { "topicName": "Urms L2", "type": "sensor2Dec", "name": "Urms L2", "lastValue": 222, "min": 210, "max": 225, "interval": 3000 },
            { "topicName": "Phase angle L2", "type": "sensor2Dec", "name": "Phase angle L2", "lastValue": 5.07, "min": 4.80, "max": 5.10, "interval": 3000 },
            { "topicName": "Voltage angle L2", "type": "sensor2Dec", "name": "Phase angle L2", "lastValue": 120, "min": 118, "max": 122, "interval": 3000 },

            { "topicName": "Irms L3", "type": "sensor2Dec", "name": "Irms L3", "lastValue": 420, "min": 400, "max": 440, "interval": 3000 },
            { "topicName": "Urms L3", "type": "sensor2Dec", "name": "Urms L3", "lastValue": 219, "min": 210, "max": 225, "interval": 3000 },
            { "topicName": "Phase angle L3", "type": "sensor2Dec", "name": "Phase angle L3", "lastValue": 5.04, "min": 4.80, "max": 5.10, "interval": 3000 },

            { "topicName": "Frequency", "type": "sensor2Dec", "name": "Frequency", "lastValue": 50, "min": 49, "max": 51, "interval": 3000 },
        ]
    },
    {
        "type": "WB-MAP3E",
        "address": 2,
        "emulators": [
            { "topicName": "Irms L1", "type": "sensor2Dec", "name": "Irms L1", "lastValue": 390, "min": 380, "max": 420, "interval": 3000 }, // interval (ms) >=1000 ms
            { "topicName": "Urms L1", "type": "sensor2Dec", "name": "Urms L1", "lastValue": 220, "min": 210, "max": 225, "interval": 3000 },
            { "topicName": "Phase angle L1", "type": "sensor2Dec", "name": "Phase angle L1", "lastValue": 5.05, "min": 4.80, "max": 5.10, "interval": 3000 },
            { "topicName": "Voltage angle L1", "type": "sensor2Dec", "name": "Phase angle L1", "lastValue": 0, "min": 0, "max": 0, "interval": 3000 },

            { "topicName": "Irms L2", "type": "sensor2Dec", "name": "Irms L2", "lastValue": 370, "min": 350, "max": 390, "interval": 3000 },
            { "topicName": "Urms L2", "type": "sensor2Dec", "name": "Urms L2", "lastValue": 222, "min": 210, "max": 225, "interval": 3000 },
            { "topicName": "Phase angle L2", "type": "sensor2Dec", "name": "Phase angle L2", "lastValue": 5.07, "min": 4.80, "max": 5.10, "interval": 3000 },
            { "topicName": "Voltage angle L2", "type": "sensor2Dec", "name": "Phase angle L2", "lastValue": 120, "min": 118, "max": 122, "interval": 3000 },

            { "topicName": "Irms L3", "type": "sensor2Dec", "name": "Irms L3", "lastValue": 420, "min": 400, "max": 440, "interval": 3000 },
            { "topicName": "Urms L3", "type": "sensor2Dec", "name": "Urms L3", "lastValue": 219, "min": 210, "max": 225, "interval": 3000 },
            { "topicName": "Phase angle L3", "type": "sensor2Dec", "name": "Phase angle L3", "lastValue": 5.04, "min": 4.80, "max": 5.10, "interval": 3000 },

            { "topicName": "Frequency", "type": "sensor2Dec", "name": "Frequency", "lastValue": 50, "min": 49, "max": 51, "interval": 3000 },
        ]
    },
    {
        "type": "WB-MR6C",
        "address": 3,
        "emulators": [
        ]
    },
    {
        "type": "WB-MR6C",
        "address": 4,
        "emulators": [
        ]
    },
    {
        "type": "WB-MSW v.3",
        "address": 5,
        "emulators": [
            { "topicName": "Temperature", "type": "sensor2Dec", "name": "Bathroom Temperature", "lastValue": 28, "min": 20, "max": 30, "interval": 10000 }, // interval (ms) >=1000 ms
            { "topicName": "Humidity", "type": "sensor2Dec", "name": "Bathroom Humidity", "lastValue": 65, "min": 10, "max": 80, "interval": 10000 },
            { "topicName": "VOC", "type": "sensor0Dec", "name": "Bathroom VOC", "lastValue": 900, "min": 500, "max": 4000, "interval": 10000 },
            { "topicName": "CO2", "type": "sensor0Dec", "name": "Bathroom CO2", "lastValue": 1200, "min": 450, "max": 2000, "interval": 10000 },
            { "topicName": "Noise", "type": "sensor2Dec", "name": "Bathroom Noise", "lastValue": 70, "min": 38, "max": 105, "interval": 3000 },
            { "topicName": "Illuminance", "type": "sensor2Dec", "name": "Bathroom Illuminance", "lastValue": 12, "min": 0, "max": 123, "interval": 3000 },
        ]
    },
]

init()

function init() {
    emulator.init(devices);
    // задаём какие-то начальные значения для первого счётчика
    emulator.publishValue("wb-map3e_1", "AP energy L1", 1250.120)
    emulator.publishValue("wb-map3e_1", "AP energy L2", 4843.150)
    emulator.publishValue("wb-map3e_1", "AP energy L3", 1489.190)

    emulator.publishValue("wb-map3e_1", "RP energy L1", 120.600)
    emulator.publishValue("wb-map3e_1", "RP energy L2", 450.130)
    emulator.publishValue("wb-map3e_1", "RP energy L3", 35.520)

    // Инициализация реле, потом надо перетащить в эмулятор
    emulator.publishValue("wb-mr6c_3", "K1", 1)
    emulator.publishValue("wb-mr6c_3", "K2", 1)
    emulator.publishValue("wb-mr6c_3", "K3", 1)
    emulator.publishValue("wb-mr6c_3", "K4", 1)
    emulator.publishValue("wb-mr6c_3", "K5", 1)
    emulator.publishValue("wb-mr6c_3", "K6", 0)

    emulator.publishValue("wb-mr6c_4", "K1", 1)
    emulator.publishValue("wb-mr6c_4", "K2", 1)
    emulator.publishValue("wb-mr6c_4", "K3", 1)
    emulator.publishValue("wb-mr6c_4", "K4", 1)
    emulator.publishValue("wb-mr6c_4", "K5", 0)
    emulator.publishValue("wb-mr6c_4", "K6", 0)

    serviceDeviceInit()
}

// вспомогательное устройство с суммами энергий и мощностей
function serviceDeviceInit() {
    defineVirtualDevice('el-srv-dev', {
        title: 'Electro Service',
        cells: {
            "wb-map3e_1 P": {
                title: "WB-MAP3E-1 P",
                type: "value",
                value: 0,
                order: 1
            },
            "wb-map3e_1 S": {
                title: "WB-MAP3E-1 S",
                type: "value",
                value: 0,
                order: 2
            },
            "wb-map3e_1 AP Energy": {
                title: "WB-MAP3E-1 AP Energy",
                type: "value",
                value: 0,
                order: 3
            },
            "wb-map3e_2 P": {
                title: "WB-MAP3E-2 P",
                type: "value",
                value: 0,
                order: 4
            },
            "wb-map3e_2 S": {
                title: "WB-MAP3E-2 S",
                type: "value",
                value: 0,
                order: 5
            },
            "wb-map3e_2 AP Energy": {
                title: "WB-MAP3E-2 AP Energy",
                type: "value",
                value: 0,
                order: 6
            },
            "wb-map3e P1-2": {
                title: "WB-MAP3E P1-2",
                type: "value",
                value: 0,
                order: 7
            },
            "wb-map3e S1-2": {
                title: "WB-MAP3E S1-2",
                type: "value",
                value: 0,
                order: 7
            },
        }
    })

    defineRule({
        whenChanged: [
            "wb-map3e_1/AP energy L1",
            "wb-map3e_1/AP energy L2",
            "wb-map3e_1/AP energy L3",
            "wb-map3e_1/P L1",
            "wb-map3e_1/P L2",
            "wb-map3e_1/P L3",
            "wb-map3e_1/S L1",
            "wb-map3e_1/S L2",
            "wb-map3e_1/S L3",
            "wb-map3e_2/AP energy L1",
            "wb-map3e_2/AP energy L2",
            "wb-map3e_2/AP energy L3",
            "wb-map3e_2/P L1",
            "wb-map3e_2/P L2",
            "wb-map3e_2/P L3",
            "wb-map3e_2/S L1",
            "wb-map3e_2/S L2",
            "wb-map3e_2/S L3",
            "el-srv-dev/wb-map3e_1 P",
            "el-srv-dev/wb-map3e_2 P",
            "el-srv-dev/wb-map3e_1 S",
            "el-srv-dev/wb-map3e_2 S"
        ],
        then: function (newValue, devName, cellName) {
            switch (cellName) {
                case "wb-map3e_1 S":
                case "wb-map3e_2 S":
                    var sum = dev[devName]["wb-map3e_1 S"] + dev[devName]["wb-map3e_2 S"]
                    dev["el-srv-dev"]["wb-map3e S1-2"] = Number(sum.toFixed(2))
                    break;
                case "wb-map3e_1 P":
                case "wb-map3e_2 P":
                    var sum = dev[devName]["wb-map3e_1 P"] + dev[devName]["wb-map3e_2 P"]
                    dev["el-srv-dev"]["wb-map3e P1-2"] = Number(sum.toFixed(2))
                    break;
                case "AP energy L1":
                case "AP energy L2":
                case "AP energy L3":
                    var sum = dev[devName]["AP energy L1"] + dev[devName]["AP energy L2"] + dev[devName]["AP energy L3"]
                    dev["el-srv-dev"][devName + " AP Energy"] = Number(sum.toFixed(2))
                    break;
                case "P L1":
                case "P L2":
                case "P L3":
                    var sum = dev[devName]["P L1"] + dev[devName]["P L2"] + dev[devName]["P L3"]
                    dev["el-srv-dev"][devName + " P"] = Number(sum.toFixed(2))
                    break;
                case "S L1":
                case "S L2":
                case "S L3":
                    var sum = dev[devName]["S L1"] + dev[devName]["S L2"] + dev[devName]["S L3"]
                    dev["el-srv-dev"][devName + " S"] = Number(sum.toFixed(2))
                    break;
                default:
                    break;
            }
        }
    });
}

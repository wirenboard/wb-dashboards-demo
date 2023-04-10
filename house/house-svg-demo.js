var emulator = require("device-emulator"); // подключаем модуль
var devices = [ // описываем устройства
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
        "type": "WB-MR6C",
        "address": 5,
        "emulators": [
        ]
    },
    {
        "type": "WB-MR6C",
        "address": 6,
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
    {
        "type": "WB-MSW v.3",
        "address": 6,
        "emulators": [
            { "topicName": "Temperature", "type": "sensor2Dec", "name": "Bathroom Temperature", "lastValue": 28, "min": 20, "max": 30, "interval": 10000 }, // interval (ms) >=1000 ms
            { "topicName": "Humidity", "type": "sensor2Dec", "name": "Bathroom Humidity", "lastValue": 65, "min": 10, "max": 80, "interval": 10000 },
            { "topicName": "VOC", "type": "sensor0Dec", "name": "Bathroom VOC", "lastValue": 900, "min": 500, "max": 4000, "interval": 10000 },
            { "topicName": "CO2", "type": "sensor0Dec", "name": "Bathroom CO2", "lastValue": 1200, "min": 450, "max": 2000, "interval": 10000 },
            { "topicName": "Noise", "type": "sensor2Dec", "name": "Bathroom Noise", "lastValue": 70, "min": 38, "max": 105, "interval": 3000 },
            { "topicName": "Illuminance", "type": "sensor2Dec", "name": "Bathroom Illuminance", "lastValue": 12, "min": 0, "max": 123, "interval": 3000 },
        ]
    },
    {
        "type": "WB-MSW v.3",
        "address": 7,
        "emulators": [
            { "topicName": "Temperature", "type": "sensor2Dec", "name": "Bathroom Temperature", "lastValue": 28, "min": 20, "max": 30, "interval": 10000 }, // interval (ms) >=1000 ms
            { "topicName": "Humidity", "type": "sensor2Dec", "name": "Bathroom Humidity", "lastValue": 65, "min": 10, "max": 80, "interval": 10000 },
            { "topicName": "VOC", "type": "sensor0Dec", "name": "Bathroom VOC", "lastValue": 900, "min": 500, "max": 4000, "interval": 10000 },
            { "topicName": "CO2", "type": "sensor0Dec", "name": "Bathroom CO2", "lastValue": 1200, "min": 450, "max": 2000, "interval": 10000 },
            { "topicName": "Noise", "type": "sensor2Dec", "name": "Bathroom Noise", "lastValue": 70, "min": 38, "max": 105, "interval": 3000 },
            { "topicName": "Illuminance", "type": "sensor2Dec", "name": "Bathroom Illuminance", "lastValue": 12, "min": 0, "max": 123, "interval": 3000 },
        ]
    },
    {
        "type": "WB-MSW v.3",
        "address": 8,
        "emulators": [
            { "topicName": "Temperature", "type": "sensor2Dec", "name": "Bathroom Temperature", "lastValue": 28, "min": 20, "max": 30, "interval": 10000 }, // interval (ms) >=1000 ms
            { "topicName": "Humidity", "type": "sensor2Dec", "name": "Bathroom Humidity", "lastValue": 65, "min": 10, "max": 80, "interval": 10000 },
            { "topicName": "VOC", "type": "sensor0Dec", "name": "Bathroom VOC", "lastValue": 900, "min": 500, "max": 4000, "interval": 10000 },
            { "topicName": "CO2", "type": "sensor0Dec", "name": "Bathroom CO2", "lastValue": 1200, "min": 450, "max": 2000, "interval": 10000 },
            { "topicName": "Noise", "type": "sensor2Dec", "name": "Bathroom Noise", "lastValue": 70, "min": 38, "max": 105, "interval": 3000 },
            { "topicName": "Illuminance", "type": "sensor2Dec", "name": "Bathroom Illuminance", "lastValue": 12, "min": 0, "max": 123, "interval": 3000 },
        ]
    },
    {
        "type": "WB-MSW v.3",
        "address": 9,
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
    // Инициализация реле, потом надо перетащить в эмулятор
    emulator.publishValue("wb-mr6c_3", "K1", 1)
    emulator.publishValue("wb-mr6c_3", "K2", 0)
    emulator.publishValue("wb-mr6c_3", "K3", 1)
    emulator.publishValue("wb-mr6c_3", "K4", 0)
    emulator.publishValue("wb-mr6c_3", "K5", 1)
    emulator.publishValue("wb-mr6c_3", "K6", 0)

    emulator.publishValue("wb-mr6c_4", "K1", 0)
    emulator.publishValue("wb-mr6c_4", "K2", 1)
    emulator.publishValue("wb-mr6c_4", "K3", 0)
    emulator.publishValue("wb-mr6c_4", "K4", 1)
    emulator.publishValue("wb-mr6c_4", "K5", 0)
    emulator.publishValue("wb-mr6c_4", "K6", 1)

    emulator.publishValue("wb-mr6c_5", "K1", 1)
    emulator.publishValue("wb-mr6c_5", "K2", 0)
    emulator.publishValue("wb-mr6c_5", "K3", 0)
    emulator.publishValue("wb-mr6c_5", "K4", 1)
    emulator.publishValue("wb-mr6c_5", "K5", 1)
    emulator.publishValue("wb-mr6c_5", "K6", 0)

    emulator.publishValue("wb-mr6c_6", "K1", 1)
    emulator.publishValue("wb-mr6c_6", "K2", 0)
    emulator.publishValue("wb-mr6c_6", "K3", 1)
    emulator.publishValue("wb-mr6c_6", "K4", 0)
    emulator.publishValue("wb-mr6c_6", "K5", 1)
    emulator.publishValue("wb-mr6c_6", "K6", 0)
}

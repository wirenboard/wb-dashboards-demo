var emulator = require("device-emulator"); // подключаем модуль
var devices = [ // описываем устройства
    {
        "type": "WB-RM6C",
        "address": 3,
        "emulators": [
        ]
    },
    {
        "type": "WB-RM6C",
        "address": 4,
        "emulators": [
        ]
    },
    {
        "type": "WB-RM6C",
        "address": 5,
        "emulators": [
        ]
    },
    {
        "type": "WB-RM6C",
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
    emulator.publishValue("wb-rm6c-3", "K 1", 1)
    emulator.publishValue("wb-rm6c-3", "K 2", 0)
    emulator.publishValue("wb-rm6c-3", "K 3", 1)
    emulator.publishValue("wb-rm6c-3", "K 4", 0)
    emulator.publishValue("wb-rm6c-3", "K 5", 1)
    emulator.publishValue("wb-rm6c-3", "K 6", 0)

    emulator.publishValue("wb-rm6c-4", "K 1", 0)
    emulator.publishValue("wb-rm6c-4", "K 2", 1)
    emulator.publishValue("wb-rm6c-4", "K 3", 0)
    emulator.publishValue("wb-rm6c-4", "K 4", 1)
    emulator.publishValue("wb-rm6c-4", "K 5", 0)
    emulator.publishValue("wb-rm6c-4", "K 6", 1)

    emulator.publishValue("wb-rm6c-5", "K 1", 1)
    emulator.publishValue("wb-rm6c-5", "K 2", 0)
    emulator.publishValue("wb-rm6c-5", "K 3", 0)
    emulator.publishValue("wb-rm6c-5", "K 4", 1)
    emulator.publishValue("wb-rm6c-5", "K 5", 1)
    emulator.publishValue("wb-rm6c-5", "K 6", 0)

    emulator.publishValue("wb-rm6c-6", "K 1", 1)
    emulator.publishValue("wb-rm6c-6", "K 2", 0)
    emulator.publishValue("wb-rm6c-6", "K 3", 1)
    emulator.publishValue("wb-rm6c-6", "K 4", 0)
    emulator.publishValue("wb-rm6c-6", "K 5", 1)
    emulator.publishValue("wb-rm6c-6", "K 6", 0)
}
templates = [
    {
        "type": "WB-MSW v.3",
        "entities": [
            { "name": "Temperature", "type": "value", "units": "°C" },
            { "name": "Humidity", "type": "value", "units": "%, RH" },
            { "name": "VOC", "type": "value", "units": "ppb" },
            { "name": "CO2", "type": "value", "units": "ppm" },
            { "name": "Noise", "type": "value", "units": "dbA" },
            { "name": "Illuminance", "type": "value", "units": "lux" },
            { "name": "LED Green", "type": "switch", "readonly": false },
            { "name": "LED Red", "type": "switch", "readonly": false },
            { "name": "Buzzer", "type": "switch", "readonly": false },
        ]
    },
    {
        "type": "WB-RM6C",
        "entities": [
            { "name": "K {}", "type": "switch", "readonly": false, "count": 6 },
            { "name": "Input {}", "type": "switch", "readonly": true, "count": 6 },
        ]
    },
    {
        "type": "WB-MR6C",
        "entities": [
            { "name": "K {}", "type": "switch", "readonly": false, "count": 6 },
            { "name": "Input {}", "type": "switch", "readonly": true, "count": 6 },
        ]
    },
    {
        "type": "WB-MRWL3",
        "entities": [
            { "name": "K {}", "type": "switch", "readonly": false, "count": 3 },
        ]
    },
    {
        "type": "WB-MDM3",
        "entities": [
            { "name": "K {}", "type": "switch", "readonly": false, "count": 3 },
            { "name": "Channel {}", "type": "range", "units": "%", "readonly": false, "min": 0, "max": 100, "count": 3 },
        ]
    },
    {
        "type": "WB-MAP3E",
        "entities": [
            { "name": "Irms L{}", "type": "value", "units": "А", "count": 3 },
            { "name": "Ipeak L{}", "type": "value", "units": "А", "count": 3 },
            { "name": "P L{}", "type": "value", "units": "Вт", "count": 3 },
            { "name": "Q L{}", "type": "value", "units": "вар", "count": 3 },
            { "name": "S L{}", "type": "value", "units": "В·А", "count": 3 },
            { "name": "AP energy L{}", "type": "value", "units": "кВт·ч", "count": 3 },
            { "name": "RP energy L{}", "type": "value", "units": "квар·ч", "count": 3 },
            { "name": "Phase angle L{}", "type": "value", "units": "°", "count": 3 },
            { "name": "Urms L{}", "type": "value", "units": "В", "count": 3 },
            { "name": "Upeak L{}", "type": "value", "units": "В", "count": 3 },
            { "name": "Voltage angle L{}", "type": "value", "units": "°", "count": 3 },
            { "name": "Frequency", "type": "value", "units": "Гц" },
        ]
    },
];

session = {
    devices: [],
    controls: [],
    emulators: []
}

function init(deviceArr) {
    var devices = deviceArr
    devices.forEach(function (item, index, arr) {
        initDevice(item);
    });
}


function initDevice(newDevice) {
    var deviceType = newDevice["type"]
    var deviceTitle = "{} {}".format(deviceType, newDevice["address"]);
    var deviceName = formatDeviceName(deviceTitle)
    var emulators = newDevice["emulators"]

    newDevice["name"] = deviceName
    var entities = getDeviceTemplate(deviceType);

    createDeviceIsNotExists(deviceName, deviceTitle);

    entities.forEach(function (item, index, arr) {
        count = item["count"]

        if (count != undefined) {
            i = 0
            while (i < count) {
                createControlIsNotExists(deviceName, item, i + 1);
                i++
            }
        } else {
            createControlIsNotExists(deviceName, item);
        }
    });

    initEmulators(deviceName, emulators)

    if (deviceType == "WB-MAP3E") { map3eInit(deviceName) }
}

function formatDeviceName(deviceName) {
    return deviceName.toLowerCase().replace(/ /g, "-").replace(/\./g, "")
}

function getDeviceTemplate(deviceType) {
    return getElement(templates, "type", deviceType, "entities")
}

function getElement(arr, searchkey, string, rerultKey) {
    for (k in arr) {
        if (arr[k][searchkey] === string) {
            return (rerultKey != undefined) ? arr[k][rerultKey] : arr[k]
        }
    }
}

function getElementIndex(arr, searchkey, string) {
    arr.forEach(function (item, index, arr) {
        if (item[searchkey] === string) return index
    });

    return -1
}

/* Эмулятор */

function initEmulators(deviceName, emulators) {
    emulators.forEach(function (item, index, arr) {
        initEmulator(deviceName, item)

    });

    setInterval(function () {
        emulatorsAction() // с таймером надо доработать — не соблюдает интервалы.
    }, 2000);
}

function initEmulator(deviceName, emulator) {
    // log("initEmulator {}", JSON.stringify(emulator))

    var topic = genWbTopicName(deviceName, emulator["topicName"])
    session.emulators.push(
        {
            "topic": topic,
            "emulator": emulator,
            "time": emulator["interval"]
        }
    )

    writeNewValue(topic, emulator)
}

function emulatorsAction() {
    var emulators = session.emulators

    emulators.forEach(function (item, index, arr) {
        var topic = item["topic"]
        var emulator = item["emulator"]

        if (item["time"] <= 0) {
            writeNewValue(topic, emulator)

            item["time"] = emulator["interval"]
        } else {
            item["time"] = item["time"] - 1000
        }
    });

}

function writeNewValue(topic, emulator) {
    var newValue = genNextValue(emulator)
    emulator["lastValue"] = newValue
    publishValue(topic, newValue)
}

function genNextValue(emulator) {
    switch (emulator["type"]) {
        case "sensor2Dec":
            return genNextNumberValue(emulator["lastValue"], emulator["min"], emulator["max"], 100)
        case "sensor0Dec":
            return genNextNumberValue(emulator["lastValue"], emulator["min"], emulator["max"], 1)
        default:
            log.error("[wb-demo] Unknown emulator type {}", emulator["type"])
            break;
    }
}

// Генерирует новое случайное значение, которое отличается от предыдущего на 3 %
function genNextNumberValue(lastValue, min, max, precision) {
    var precision = (precision != undefined) ? precision : 1

    var value = lastValue + ((max - min) * (Math.random() - 0.5)) * 0.03;
    value = Math.max(min, Math.min(max, value));
    return (Math.round(value * precision) / precision);
}

/* Работа с виртуальными устройствами */

function itemIsExists(arr, itemName) {
    return arr.indexOf(itemName) > -1
}

function createDeviceIsNotExists(deviceName, deviceTitle) {
    if (!itemIsExists(session.devices, deviceName)) {
        publishValue("/devices/{}/meta/name".format(deviceName), deviceTitle)
        publishValue("/devices/{}/meta/driver".format(deviceName), "wb-demo")

        return session.devices.push(deviceName)
    }
}

function createControlIsNotExists(deviceName, entity, index) {
    var topicName = (index != undefined) ? entity["name"].format(index) : entity["name"]

    var topic = genWbTopicName(deviceName, topicName);

    if (!itemIsExists(session.controls, topic)) {
        meta = genControlMeta(entity, topicName)
        createControl(topic, meta)

        translateValueInit(topic)
    }
}

function createControl(topic, meta) {
    var value = meta["value"];

    publishValue("{}/meta".format(topic), JSON.stringify(meta));

    if (meta["max"] != undefined) {
        publishValue("{}/meta/max".format(topic), meta["max"])
    }

    if (meta["order"] != undefined) {
        publishValue("{}/meta/order".format(topic), meta["order"])
    }

    publishValue("{}/meta/type".format(topic), meta["type"]);

    publishValue(topic, value);

    session.controls.push({
        "id": topic,
        "value": value
    })
}

function getElement(arr, searchkey, string, rerultKey) {
    for (k in arr) {
        if (arr[k][searchkey] === string) {
            return arr[k][rerultKey]
        }
    }
}

function genWbTopicName(deviceName, controlName) {
    return "/devices/{}/controls/{}".format(deviceName, controlName);
}

function genControlMeta(entity, topicName) {
    var meta = {}

    for (key in entity) {
        switch (key) {
            case "title":
                meta[key] = (topicName != undefined) ? genTitle(topicName) : genTitle(entity["name"])
                break;
            case "value":
                meta[key] = (entity["value"] === undefined) ? genDefaultValue(entity["type"]) : entity["value"]
                break;
            case "readonly":
                meta[key] = (entity["readonly"] === undefined) ? true : entity["readonly"]
                break;
            case "order":
                meta[key] = (entity["order"] === undefined) ? 0 : entity["order"]
                break;

            default:
                meta[key] = entity[key]
                break;
        }
    }

    return meta
}

function genTitle(name) {
    return {
        "en": name
    }
}

function genDefaultValue(type) {
    switch (type) {
        case "value":
        case "switch":
        case "range":
            return 0
        default:
            return null
    }
}

function publishValue(topic, newValue) {
    publish(topic, newValue, 2, true)
}

function publishWbValue(deviceName, controlName, newValue) {
    topic = genWbTopicName(deviceName, controlName)
    publishValue(topic, newValue)
};

function translateValueInit(topic) {
    trackMqtt(topic + "/on", function (message) {
        publishValue(message.topic.replace('/on', ''), message.value)
    });
}
// Calculate functions
function map3eInit(mapName) {
    defineRule({
        whenChanged: [mapName + "/Urms L1"],
        then: function (newValue, devName, cellName) {
            publishWbValue(devName, "Upeak L1", (newValue * (1 + 0.5)).toFixed(2))
        }
    });

    defineRule({
        whenChanged: [mapName + "/Irms L1"],
        then: function (newValue, devName, cellName) {
            publishWbValue(devName, "Ipeak L1", 12) //(newValue * (1 + 0.5)).toFixed(2)

            var SL1 = (newValue * dev[devName]["Urms L1"]).toFixed(2)
            publishWbValue(devName, "S L1", SL1)

            var PL1 = (SL1 * (1 - 0.07)).toFixed(2)
            publishWbValue(devName, "P L1", PL1)

            var APEnergyL1 = (dev[devName]["AP energy L1"] + (PL1 / 1800000)).toFixed(3)
            publishWbValue(devName, "AP energy L1", APEnergyL1)

            var sqSL1 = dev[devName]["S L1"] * dev[devName]["S L1"]
            var sqPL1 = dev[devName]["P L1"] * dev[devName]["P L1"]
            var QL1 = Math.sqrt(sqSL1 - sqPL1).toFixed(2)
            publishWbValue(devName, "Q L1", QL1)

            var RPEnergyL1 = (dev[devName]["RP energy L1"] + (QL1 / 1800000)).toFixed(3)
            publishWbValue(devName, "RP energy L1", RPEnergyL1)
        }
    });

    defineRule({
        whenChanged: [mapName + "/Urms L2"],
        then: function (newValue, devName, cellName) {
            publishWbValue(devName, "Upeak L2", (newValue * (1 + 0.5)).toFixed(2))
        }
    });

    defineRule({
        whenChanged: [mapName + "/Voltage angle L2"],
        then: function (newValue, devName, cellName) {
            publishWbValue(devName, "Voltage angle L3", (0 - newValue))
        }
    });

    defineRule({
        whenChanged: [mapName + "/Irms L2"],
        then: function (newValue, devName, cellName) {
            publishWbValue(devName, "Ipeak L2", (newValue * (1 + 0.5)).toFixed(2))

            var SL2 = (newValue * dev[devName]["Urms L2"]).toFixed(2)
            publishWbValue(devName, "S L2", SL2)

            var PL2 = (SL2 * (1 - 0.07)).toFixed(2)
            publishWbValue(devName, "P L2", PL2)

            var APEnergyL2 = (dev[devName]["AP energy L2"] + (PL2 / 1800000)).toFixed(3)
            publishWbValue(devName, "AP energy L2", APEnergyL2)

            var sqSL2 = dev[devName]["S L2"] * dev[devName]["S L2"]
            var sqPL2 = dev[devName]["P L2"] * dev[devName]["P L2"]
            var QL2 = Math.sqrt(sqSL2 - sqPL2).toFixed(2)
            publishWbValue(devName, "Q L2", QL2)

            var RPEnergyL2 = (dev[devName]["RP energy L2"] + (QL2 / 1800000)).toFixed(3)
            publishWbValue(devName, "RP energy L2", RPEnergyL2)
        }
    });

    defineRule({
        whenChanged: [mapName + "/Urms L3"],
        then: function (newValue, devName, cellName) {
            publishWbValue(devName, "Upeak L3", (newValue * (1 + 0.5)).toFixed(2))
        }
    });

    defineRule({
        whenChanged: [mapName + "/Irms L3"],
        then: function (newValue, devName, cellName) {
            publishWbValue(devName, "Ipeak L3", (newValue * (1 + 0.5)).toFixed(2))

            var SL3 = (newValue * dev[devName]["Urms L3"]).toFixed(2)
            publishWbValue(devName, "S L3", SL3)

            var PL3 = (SL3 * (1 - 0.07)).toFixed(2)
            publishWbValue(devName, "P L3", PL3)

            var APEnergyL3 = (dev[devName]["AP energy L3"] + (PL3 / 1800000)).toFixed(3)
            publishWbValue(devName, "AP energy L3", APEnergyL3)

            var sqSL3 = dev[devName]["S L3"] * dev[devName]["S L3"]
            var sqPL3 = dev[devName]["P L3"] * dev[devName]["P L3"]
            var QL3 = Math.sqrt(sqSL3 - sqPL3).toFixed(2)
            publishWbValue(devName, "Q L3", QL3)

            var RPEnergyL3 = (dev[devName]["RP energy L3"] + (QL3 / 1800000)).toFixed(3)
            publishWbValue(devName, "RP energy L3", RPEnergyL3)
        }
    });
}

// Exports
exports.init = function (devices) {
    init(devices)
};

exports.publishValue = function (deviceName, controlName, newValue) {
    topic = genWbTopicName(deviceName, controlName)
    publishValue(topic, newValue)
};
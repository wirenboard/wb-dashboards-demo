defineVirtualDevice("4in-panel-thermostat", {
    title: "4in Thermostat Panel",
    cells: {
        CurrTemp: {
            title: "Current Temp",
            type: "value",
            value: 19,
            order: 3
        },
        SetTemp: {
            title: "Set Temp",
            type: "value",
            value: 20,
            order: 4
        },
        Up: {
            title: "Up",
            type: "pushbutton",
            order: 5
        },
        Down: {
            title: "Down",
            type: "pushbutton",
            order: 6
        },
        AutoMode: {
            title: "Auto Mode",
            type: "switch",
            value: false,
            order: 7
        },
        HeatMode: {
            title: "Heat Mode",
            type: "switch",
            value: false,
            order: 8
        },
        CoolMode: {
            title: "Cool Mode",
            type: "switch",
            value: false,
            order: 9
        },
        OffMode: {
            title: "Off Mode",
            type: "switch",
            value: true,
            order: 10
        },
    }
})

defineRule("up_down", {
    whenChanged: ["4in-panel-thermostat/Up", "4in-panel-thermostat/Down"],
    then: function (newValue, devName, cellName) {
        oldValue = dev["4in-panel-thermostat/SetTemp"]

        dev["4in-panel-thermostat/SetTemp"] = up_down_value(oldValue, cellName, 0.5)
    }
});

defineRule("modes", {
    whenChanged: [
        "4in-panel-thermostat/OffMode",
        "4in-panel-thermostat/CoolMode",
        "4in-panel-thermostat/HeatMode",
        "4in-panel-thermostat/AutoMode"
    ],
    then: function (newValue, devName, cellName) {
        switch (cellName) {
            case "OffMode":
                if (newValue) {
                    off_controls(["CoolMode", "HeatMode", "AutoMode"])
                }
                break;
            case "CoolMode":
                if (newValue) {
                    off_controls(["OffMode", "HeatMode", "AutoMode"])
                }
                break;
            case "HeatMode":
                if (newValue) {
                    off_controls(["OffMode", "CoolMode", "AutoMode"])
                }
                break;
            case "AutoMode":
                if (newValue) {
                    off_controls(["OffMode", "CoolMode", "HeatMode"])
                }
                break;
            default:
                break;
        }
    }
});

function off_controls(controls_arr) {
    controls_arr.forEach(function (item, index, array) {
        dev["4in-panel-thermostat/" + item] = false
    });
}

function up_down_value(value, direction, step) {
    switch (direction) {
        case "Up":
            newValue = value + step
            break;
        case "Down":
            newValue = value - step
            break;
    }
    return newValue
}


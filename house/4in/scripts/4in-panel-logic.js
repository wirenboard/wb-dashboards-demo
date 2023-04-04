defineRule({
    whenChanged: ["wb-msw-v3_44/Temperature"],
    then: function (newValue, devName, cellName) {
        dev["4in-panel-thermostat/CurrTemp"] = newValue

    }
});

defineRule({
    whenChanged: ["wb-msw-v3_44/Humidity"],
    then: function (newValue, devName, cellName) {
        dev["4in-panel-thermostat/Humidity"] = newValue
    }
});

defineRule({
    whenChanged: ["wb-msw-v3_44/CO2"],
    then: function (newValue, devName, cellName) {
        dev["4in-panel-thermostat/Co2"] = newValue
    }
});
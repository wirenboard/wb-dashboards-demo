defineRule({
    whenChanged: ["wb-msw-v3_44/Temperature"],
    then: function (newValue, devName, cellName) {
        dev["4in-panel-thermostat/CurrTemp"] = newValue

    }
});

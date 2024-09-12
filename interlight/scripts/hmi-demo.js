var dimmerLedDevice = "wb-led_1";
var dimmerLightDevice = "wb-mdm3_57";
var relayDevice = "wb-mr6cv3_227";
var mswDevice= "wb-msw-v3_162";
var masterButtonFullPath = "wb-mdm3_57/Input 6";

defineVirtualDevice("hmi-demo", {
    title: {'en': 'HMI Demo', 'ru': 'HMI Демо'} ,
    cells: {
      rgb_css: {
        title: {'en': 'RGB CSS', 'ru': 'RGB CSS'},
        type: "text",
        value: "",
      },
      rgb_pallete: {
        title: {'en': 'RGB Palette', 'ru': 'RGB Палитра'},
        type: "text",
        value: "",
      },
      rgb_state: {
        title: {'en': 'RGB State', 'ru': 'RGB Статус'},
        type: "switch",
        value: false,
      },
      light1_state: {
        title: {'en': 'Light 1 State', 'ru': 'Лампа 1 Статус'},
        type: "switch",
        value: false,
      },
      light1_brightness: {
        title: {'en': 'Light 1 Brightness', 'ru': 'Лампа 1 Яркость'},
        type: "range",
        value: 0,
        max: 100,
        min: 0
      },
      light1_opacity: {
        title: {'en': 'Light 1 opacity', 'ru': 'Лампа 1 Непрозрачность'},
        type: "value",
        value: 0
      },
      light1_brightness_up: {
        title: {'en': 'Light 1 Brightness Up', 'ru': 'Лампа 1 Яркость Увеличить'},
        type: "pushbutton",
      },
      light1_brightness_down: {
        title: {'en': 'Light 1 Brightness Down', 'ru': 'Лампа 1 Яркость Уменьшить'},
        type: "pushbutton",
      },
      light2_state: {
        title: {'en': 'Light 2 State', 'ru': 'Лампа 2 Статус'},
        type: "switch",
        value: false,
      },
      light3_state: {
        title: {'en': 'Light 3 State', 'ru': 'Лампа 3 Статус'},
        type: "switch",
        value: false,
      },
      turn_off_all: {
        title: {'en': 'Turn Off All', 'ru': 'Выключить всё'},
        type: "pushbutton",
      },
      msw_temperature: {
        title: {'en': 'MSW Temperature', 'ru': 'Температура'},
        type: "value",
        value: 0,
        units: "deg C"
      },
      msw_humidity: {
        title: {'en': 'MSW Humidity', 'ru': 'Влажность воздуха'},
        type: "value",
        value: 0,
        units: "%, RH"
      },
      msw_co2: {
        title: {'en': 'MSW CO2', 'ru': 'CO2'},
        type: "value",
        value: 0,
        units: "ppm"
      },
      msw_illuminance: {
        title: {'en': 'MSW Illuminance', 'ru': 'Освещённость'},
        type: "value",
        value: 0,
        units: "lx"
      },
      msw_sound_level: {
        title: {'en': 'MSW Sound Level', 'ru': 'Шум'},
        type: "value",
        value: 0,
        units: "dB"
      },
      msw_current_motion: {
        title: {'en': 'MSW Current Motion', 'ru': 'Движение'},
        type: "value",
        value: 0,
        units: ""
      },
    }
});

// контроль цвета ленты и конвертирование в цвета css
defineRule({
  whenChanged: dimmerLedDevice+"/RGB Palette",
  then: function (newValue, devName, cellName) {
	dev["hmi-demo"]["rgb_pallete"] = newValue;
    dev["hmi-demo"]["rgb_css"] = convertPalleteToRgbCSS(newValue);
  }
});

// контроль состояния ленты и изменение его
defineRule({
  whenChanged: [dimmerLedDevice+"/RGB Strip", "hmi-demo/rgb_state"],
  then: function (newValue, devName, cellName) {
    log(newValue)
    if (devName == dimmerLedDevice){
      dev["hmi-demo"]["rgb_state"] = newValue;
    } else {
      dev[dimmerLedDevice]["RGB Strip"] = newValue;
    }

  }
});

// контроль состояния диммера ламп
defineRule({
  whenChanged: [dimmerLightDevice+"/K1", "hmi-demo/light1_state"],
  then: function (newValue, devName, cellName) {
    if (devName == dimmerLightDevice){
      dev["hmi-demo"]["light1_state"] = newValue;
    } else {
      dev[dimmerLightDevice]["K1"] = newValue;
    }

  }
});

// контроль яркости в диммере ламп
defineRule({
  whenChanged: [dimmerLightDevice+"/Channel 1", "hmi-demo/light1_brightness"],
  then: function (newValue, devName, cellName) {
    dev["hmi-demo"]["light1_opacity"] = newValue/100
    if (devName == dimmerLightDevice){
      dev["hmi-demo"]["light1_brightness"] = newValue;
    } else {
      dev[dimmerLightDevice]["Channel 1"] = newValue;
    }

  }
});

// изменение яркости в диммере ламп
var step = 10;

defineRule({
  whenChanged: ["hmi-demo/light1_brightness_up", "hmi-demo/light1_brightness_down"],
  then: function (newValue, devName, cellName) {
    var oldValue = dev[dimmerLightDevice]["Channel 1"];

    if (cellName == "light1_brightness_up"){
      var calcValue = oldValue + step;
      dev[dimmerLightDevice]["Channel 1"] = (calcValue > 100)? 100: calcValue;
    }
    if (cellName == "light1_brightness_down"){
      var calcValue = oldValue - step;
      dev[dimmerLightDevice]["Channel 1"] = (calcValue < 0)? 0: calcValue;
    }
  }
});

// контроль состояния реле
defineRule({
  whenChanged: [
    relayDevice+"/K1",
    "hmi-demo/light2_state",
    relayDevice+"/K2",
    "hmi-demo/light3_state"
  ],
  then: function (newValue, devName, cellName) {
    switch (cellName){
      case "K1":
        dev["hmi-demo"]["light2_state"] = newValue;
        break
      case "light2_state":
        dev[relayDevice]["K1"] = newValue;
        break
      case "K2":
        dev["hmi-demo"]["light3_state"] = newValue;
        break
      case "light3_state":
        dev[relayDevice]["K2"] = newValue;
        break
    }
  }
});

// контроль параметров датчика WB-MSW
defineRule({
  whenChanged: mswDevice+"/Temperature",
  then: function (newValue, devName, cellName) {
	dev["hmi-demo"]["msw_temperature"] = newValue;
  }
});

defineRule({
  whenChanged: mswDevice+"/Humidity",
  then: function (newValue, devName, cellName) {
	dev["hmi-demo"]["msw_humidity"] = newValue;
  }
});

defineRule({
  whenChanged: mswDevice+"/CO2",
  then: function (newValue, devName, cellName) {
	dev["hmi-demo"]["msw_co2"] = newValue;
  }
});

defineRule({
  whenChanged: mswDevice+"/Illuminance",
  then: function (newValue, devName, cellName) {
	dev["hmi-demo"]["msw_illuminance"] = newValue;
  }
});

defineRule({
  whenChanged: mswDevice+"/Sound Level",
  then: function (newValue, devName, cellName) {
	dev["hmi-demo"]["msw_sound_level"] = newValue;
  }
});

defineRule({
  whenChanged: mswDevice+"/Current Motion",
  then: function (newValue, devName, cellName) {
	dev["hmi-demo"]["msw_current_motion"] = newValue;
  }
});

// Мастер-выключатель
defineRule({
  whenChanged: ["hmi-demo/turn_off_all", masterButtonFullPath],
  then: function (newValue, devName, cellName) {
    turn_off_all()
  }
});

// Мастер-выключатель по освещённости
defineRule({
  whenChanged: ["hmi-demo/msw_illuminance"],
  then: function (newValue, devName, cellName) {
    if (newValue < 10){
      turn_off_all()
    }
  }
});

function turn_off_all(){
    dev[dimmerLedDevice]["RGB Strip"] = false;
    dev[dimmerLightDevice]["K1"] = false;
    dev[relayDevice]["K1"] = false;
    dev[relayDevice]["K2"] = false;
}

function convertPalleteToRgbCSS(rgb_pallete){
  var colorComponents = rgb_pallete.split(';')

  return "rgb("+colorComponents.join(',')+")";
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

//rgb(250, 128, 114)

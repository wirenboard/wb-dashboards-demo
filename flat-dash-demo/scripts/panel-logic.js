defineVirtualDevice('panel-logic', {
    title: 'SVG-панель' ,
    cells: {
      GoOut: {
        title: "Все ушли",
	    type: "switch",
	    value: false,
        order: 1
	    },
      OffAll: {
        title: "Выключить всё",
	    type: "pushbutton",
	    value: false,
        order: 2
	    },
      SettingTemp: {
        title: "Уставка температуры",
	    type: "value",
	    value: 25,
        units: "°C",
        readonly: false,
        order: 3
	    },
      TempUp: {
        title: "Прибавить температуру",
	    type: "pushbutton",
        order: 4
	    },
      TempDown: {
        title: "Убавить температуру",
	    type: "pushbutton",
        order: 5
	    },
    }
})

// Кнопка «Все ушли»
defineRule({
  whenChanged: ["panel-logic/GoOut"],
  then: function (newValue, devName, cellName) {
    if (newValue){
      turnAllOff(); // вызов функции «Выключить всё»
      dev["panel-logic/SettingTemp"]= 22; // устанавливаем температуру
    }
  }
});

// Кнопка «Выключить всё»
defineRule({
  whenChanged: ["panel-logic/OffAll"],
  then: function (newValue, devName, cellName) {
    if (newValue){
      turnAllOff(); // вызов функции «Выключить всё»
    }
  }
});

// Функция «Выключить всё»
function turnAllOff() {
    // my-flat — это имя виртуального устройства эмулятора
    dev["my-flat/hall_light"] = false;
    dev["my-flat/kitchen_light"] = false;
    dev["my-flat/bathroom_light"] = false;
    dev["my-flat/breadroom_light"] = false;
    dev["my-flat/questroom_light"] = false;
}

var stepTemp = 1
// Кнопка «Прибавить температуру»
defineRule({
  whenChanged: ["panel-logic/TempUp"],
  then: function (newValue, devName, cellName) {
    // получаем текущее значение и прибавляем stepTemp
    dev["panel-logic/SettingTemp"] = dev["panel-logic/SettingTemp"] + stepTemp
  }
});

// Кнопка «Убавить температуру»
defineRule({
  whenChanged: ["panel-logic/TempDown"],
  then: function (newValue, devName, cellName) {
    // получаем текущее значение и вычитаем stepTemp
    dev["panel-logic/SettingTemp"] = dev["panel-logic/SettingTemp"] - stepTemp
  }
});

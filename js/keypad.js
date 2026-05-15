class GameBoyAdvanceKeypad {
	constructor() {
		this.KEYCODE_LEFT = "ArrowLeft";
		this.KEYCODE_UP = "ArrowUp";
		this.KEYCODE_RIGHT = "ArrowRight";
		this.KEYCODE_DOWN = "ArrowDown";
		this.KEYCODE_START = "Enter";
		this.KEYCODE_SELECT = "Backslash";
		this.KEYCODE_A = "KeyZ";
		this.KEYCODE_B = "KeyX";
		this.KEYCODE_L = "KeyA";
		this.KEYCODE_R = "KeyS";

		this.GAMEPAD_LEFT = 14;
		this.GAMEPAD_UP = 12;
		this.GAMEPAD_RIGHT = 15;
		this.GAMEPAD_DOWN = 13;
		this.GAMEPAD_START = 9;
		this.GAMEPAD_SELECT = 8;
		this.GAMEPAD_A = 1;
		this.GAMEPAD_B = 0;
		this.GAMEPAD_L = 4;
		this.GAMEPAD_R = 5;
		this.GAMEPAD_THRESHOLD = 0.2;

		this.A = 0;
		this.B = 1;
		this.SELECT = 2;
		this.START = 3;
		this.RIGHT = 4;
		this.LEFT = 5;
		this.UP = 6;
		this.DOWN = 7;
		this.R = 8;
		this.L = 9;

		this.currentDown = 0x03ff;
		this.eatInput = false;

		this.gamepads = [];

		this.remappingKeyId = "";
	}
	keyboardHandler(e) {
		var toggle = 0;

		// Check for a remapping
		if (this.remappingKeyId != "") {
			this.remapKeycode(this.remappingKeyId, e.code);
			this.remappingKeyId = "";
			e.preventDefault();
			return; // Could do an else and wrap the rest of the function in it, but this is cleaner
		}

		switch (e.code) {
			case this.KEYCODE_START:
				toggle = this.START;
				break;
			case this.KEYCODE_SELECT:
				toggle = this.SELECT;
				break;
			case this.KEYCODE_A:
				toggle = this.A;
				break;
			case this.KEYCODE_B:
				toggle = this.B;
				break;
			case this.KEYCODE_L:
				toggle = this.L;
				break;
			case this.KEYCODE_R:
				toggle = this.R;
				break;
			case this.KEYCODE_UP:
				toggle = this.UP;
				break;
			case this.KEYCODE_RIGHT:
				toggle = this.RIGHT;
				break;
			case this.KEYCODE_DOWN:
				toggle = this.DOWN;
				break;
			case this.KEYCODE_LEFT:
				toggle = this.LEFT;
				break;
			default:
				return;
		}

		toggle = 1 << toggle;
		if (e.type == "keydown") {
			this.currentDown &= ~toggle;
		} else {
			this.currentDown |= toggle;
		}

		if (this.eatInput) {
			e.preventDefault();
		}
	}
	gamepadHandler(gamepad) {
		var value = 0;
		var buttons = gamepad.buttons;
		if (buttons[this.GAMEPAD_LEFT] && buttons[this.GAMEPAD_LEFT].pressed) {
			value |= 1 << this.LEFT;
		}
		if (buttons[this.GAMEPAD_UP] && buttons[this.GAMEPAD_UP].pressed) {
			value |= 1 << this.UP;
		}
		if (buttons[this.GAMEPAD_RIGHT] && buttons[this.GAMEPAD_RIGHT].pressed) {
			value |= 1 << this.RIGHT;
		}
		if (buttons[this.GAMEPAD_DOWN] && buttons[this.GAMEPAD_DOWN].pressed) {
			value |= 1 << this.DOWN;
		}
		if (buttons[this.GAMEPAD_START] && buttons[this.GAMEPAD_START].pressed) {
			value |= 1 << this.START;
		}
		if (buttons[this.GAMEPAD_SELECT] && buttons[this.GAMEPAD_SELECT].pressed) {
			value |= 1 << this.SELECT;
		}
		if (buttons[this.GAMEPAD_A] && buttons[this.GAMEPAD_A].pressed) {
			value |= 1 << this.A;
		}
		if (buttons[this.GAMEPAD_B] && buttons[this.GAMEPAD_B].pressed) {
			value |= 1 << this.B;
		}
		if (buttons[this.GAMEPAD_L] && buttons[this.GAMEPAD_L].pressed) {
			value |= 1 << this.L;
		}
		if (buttons[this.GAMEPAD_R] && buttons[this.GAMEPAD_R].pressed) {
			value |= 1 << this.R;
		}

		this.currentDown = ~value & 0x3ff;
	}
	gamepadConnectHandler(gamepad) {
		this.gamepads.push(gamepad);
	}
	gamepadDisconnectHandler(gamepad) {
		this.gamepads = this.gamepads.filter((other) => other != gamepad);
	}
	pollGamepads() {
		var navigatorList = navigator.getGamepads ? navigator.getGamepads() : [];
		if (navigatorList.length) {
			this.gamepads = [];
		}
		for (var i = 0; i < navigatorList.length; ++i) {
			if (navigatorList[i]) {
				this.gamepads.push(navigatorList[i]);
			}
		}
		if (this.gamepads.length > 0) {
			this.gamepadHandler(this.gamepads[0]);
		}
	}
	registerHandlers() {
		window.addEventListener("keydown", this.keyboardHandler.bind(this), true);
		window.addEventListener("keyup", this.keyboardHandler.bind(this), true);
		window.addEventListener("gamepadconnected", this.gamepadConnectHandler.bind(this), true);
		window.addEventListener("gamepaddisconnected", this.gamepadDisconnectHandler.bind(this), true);
	}
	// keyId is ["A", "B", "SELECT", "START", "RIGHT", "LEFT", "UP", "DOWN", "R", "L"]
	initKeycodeRemap(keyId) {
		// Ensure valid keyId
		var validKeyIds = ["A", "B", "SELECT", "START", "RIGHT", "LEFT", "UP", "DOWN", "R", "L"];
		if (validKeyIds.indexOf(keyId) != -1) {
			/* If remappingKeyId holds a value, the keydown event above will
			wait for the next keypress to assign the keycode */
			this.remappingKeyId = keyId;
		}
	}
	// keyId is ["A", "B", "SELECT", "START", "RIGHT", "LEFT", "UP", "DOWN", "R", "L"]
	// code is a KeyboardEvent.code string (e.g. "KeyZ", "ArrowUp")
	remapKeycode(keyId, code) {
		switch (keyId) {
			case "A":
				this.KEYCODE_A = code;
				break;
			case "B":
				this.KEYCODE_B = code;
				break;
			case "SELECT":
				this.KEYCODE_SELECT = code;
				break;
			case "START":
				this.KEYCODE_START = code;
				break;
			case "RIGHT":
				this.KEYCODE_RIGHT = code;
				break;
			case "LEFT":
				this.KEYCODE_LEFT = code;
				break;
			case "UP":
				this.KEYCODE_UP = code;
				break;
			case "DOWN":
				this.KEYCODE_DOWN = code;
				break;
			case "R":
				this.KEYCODE_R = code;
				break;
			case "L":
				this.KEYCODE_L = code;
				break;
		}
	}
}

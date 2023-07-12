import OSType, {osType} from './OSType';
import {ScreenType, screenType} from "./ScreenType";
import {TODO} from "./TODO";
import {Data} from "./Data";
import {IRectangle} from "node-window-manager/dist/interfaces";
import {Log} from "./TMLogger";

let isWindows = osType == OSType.Windows


let _posXLeft: number;
if (isWindows) {
    _posXLeft = -7;
} else {
    _posXLeft = 0;
}

const _posYTopAlmost = 26;
const _posYTopAlmost2 = 26 * 2;

const _posXRight = 2560;

let _posYBot: number;
if (isWindows) {
    _posYBot = 1417;
} else {
    _posYBot = 1377;
}

let _posXBigRight: number;
if (screenType === ScreenType.QHD) {
    if (isWindows) {
        _posXBigRight = 629;
    } else {
        _posXBigRight = 508;
    }
} else if (screenType === ScreenType.z1080p) {
    _posXBigRight = 466;
} else {
    TODO()
}

let _posXBigRightThree: number;
if (screenType === ScreenType.QHD) {
    if (isWindows) {
        _posXBigRightThree = 566;
    } else {
        _posXBigRightThree = 401;
    }
} else {
    TODO()
}

let _posYTop: number;
if (isWindows) {
    _posYTop = -1;
} else {
    _posYTop = 25;
}

let _xHalfway: number;
if (screenType === ScreenType.QHD) {
    if (isWindows) {
        _xHalfway = 1294;
    } else {
        _xHalfway = 1279;
    }
} else if (screenType === ScreenType.z1080p) {
    _xHalfway = 974;
} else {
    TODO()
}

let _xLessThanHalfway: number;
_xLessThanHalfway = _xHalfway * 0.75

let _widthHalfway: number;
if (screenType === ScreenType.QHD) {
    if (isWindows) {
        _widthHalfway = 1294;
    } else {
        _widthHalfway = 1279;
    }
} else if (screenType === ScreenType.z1080p) {
    _widthHalfway = 974;
} else {
    TODO()
}

let _yHalfway1: number;
if (screenType === ScreenType.QHD) {
    if (isWindows) {
        _yHalfway1 = 712;
    } else {
        _yHalfway1 = 645;
    }
} else if (screenType === ScreenType.z1080p) {
    _yHalfway1 = 532;
} else {
    TODO()
}

let _yHalfway2: number;
if (screenType === ScreenType.QHD) {
    if (isWindows) {
        _yHalfway2 = _yHalfway1 - 10;
    } else {
        _yHalfway2 = _yHalfway1;
    }
} else if (screenType === ScreenType.z1080p) {
    _yHalfway2 = _yHalfway1;
} else {
    TODO()
}

let _heightHalfway: number;
if (screenType === ScreenType.QHD) {
    if (isWindows) {
        _heightHalfway = 712;
    } else {
        _heightHalfway = 620;
    }
} else if (screenType === ScreenType.z1080p) {
    _heightHalfway = 532;
} else {
    TODO()
}

let _height_fullway_almost_2: number;
if (screenType === ScreenType.QHD) {
    if (isWindows) {
        _height_fullway_almost_2 = 1360;
    } else {
        _height_fullway_almost_2 = 1330;
    }
} else if (screenType === ScreenType.z1080p) {
    _height_fullway_almost_2 = 999;
} else {
    TODO()
}

let _width_big_right_three: number;
if (screenType === ScreenType.QHD) {
    _width_big_right_three = 2005;
} else if (screenType === ScreenType.z1080p) {
    TODO()
} else {
    TODO()
}

export class ScreenSection extends Data {
    constructor(
        public x1: number,
        public y1: number,
        public x2: number,
        public y2: number
    ) {
        super();
    }

    get width(): number {
        return this.x2 - this.x1;
    }

    get height(): number {
        return this.y2 - this.y1;
    }

    static fromRectangle(rectangle: IRectangle) {
        return new ScreenSection(rectangle.x ?? 0, rectangle.y ?? 0, (rectangle.width ?? 0) + (rectangle.x ?? 0), (rectangle.height ?? 0) + (rectangle.y ?? 0));
    }

    toRectangle(): IRectangle {
        return {x: this.x1, y: this.y1, width: this.width, height: this.height}
    }

    withTopLeftCornerAdjustedDownLeft(count: number = 0): ScreenSection {
        const newX = this.x1 - 30 * count;
        const newY = this.y1 + 30 * count;
        return new ScreenSection(newX, newY, this.x2, this.y2);
    }
}

export const ScreenSectionType: { [key: string]: ScreenSection } = {
    top_left: new ScreenSection(_posXLeft, _posYTop, _xHalfway, _yHalfway1),
    bot_left: new ScreenSection(_posXLeft, _yHalfway2, _xHalfway, _posYBot),
    left: new ScreenSection(_posXLeft, _posYTop, _xHalfway, _posYBot),
    small_left: new ScreenSection(_posXLeft, _posYTop, _xLessThanHalfway, _posYBot),
    right: new ScreenSection(_xHalfway, _posYTop, _posXRight, _posYBot),
    big_right: new ScreenSection(_posXBigRight, _posYTop, _posXRight, _posYBot),
    big_right_two: new ScreenSection(_posXBigRight, _posYTop, _posXRight, _posYBot)
        .withTopLeftCornerAdjustedDownLeft(1),
    big_right_three: new ScreenSection(_posXBigRight, _posYTop, _posXRight, _posYBot)
        .withTopLeftCornerAdjustedDownLeft(2),
    big_right_four: new ScreenSection(_posXBigRight, _posYTop, _posXRight, _posYBot)
        .withTopLeftCornerAdjustedDownLeft(3),
    big_right_five: new ScreenSection(_posXBigRight, _posYTop, _posXRight, _posYBot)
        .withTopLeftCornerAdjustedDownLeft(4),
};

export function getScreenSectionType(screenSection: ScreenSection) {
    for (const key in ScreenSectionType) {
        if (ScreenSectionType.hasOwnProperty(key)) {
            const curScreenSection = ScreenSectionType[key];
            Log.d(`${key}:${curScreenSection}`);
            if (curScreenSection.equals2(screenSection)) {
                Log.d(`found match. Returning:${key}`)
                return curScreenSection;
            }
        }
    }
    return null;
}
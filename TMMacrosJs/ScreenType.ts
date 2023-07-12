import {windowManager} from "node-window-manager";
import {Log, logz} from "./TMLogger";

export enum ScreenType {
    z4k,
    QHD,
    z1080p
}

function getScreenType(): ScreenType | null {
    let width = windowManager.getPrimaryMonitor().getBounds().width
    let height = windowManager.getPrimaryMonitor().getBounds().height

    // TODO: This is a workaround because windowManager.getPrimaryMonitor().getBounds() fails on mac.
    //      Should replace with a more reliable version at some point.
    if (width === 0 && height === 0)
        return ScreenType.QHD;

    if (width === 3840 && height === 2160) {
        return ScreenType.z4k;
    } else if (width === 2560 && height === 1440) {
        return ScreenType.QHD;
    } else if (width === 1920 && height === 1080) {
        return ScreenType.z1080p;
    } else {
        return null;
    }
}

export let screenType = getScreenType();

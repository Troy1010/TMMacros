import {logz, toLogStr} from "./TMLogger";
import {Data} from "./Data";
import * as path from 'path';
// @ts-ignore
import fs from 'fs';

export class Config extends Data {
    constructor(
        public gitKrakenDir: string,
        public developGenericFolder: string,
        public bossFile: string,
        public oblivionFile: string,
    ) {
        super();
    }

    /**
     * Using JSON.parse(json) as Config doesn't always work as expected.
     * For example, it doesn't recognize toString() overrides.
     * This is a workaround for that issue.
     *
     * related stackoverflow:
     *      https://stackoverflow.com/questions/45895266/why-typescript-tostring-method-is-not-invoked-as-desired
     */
    static fromJson(json: string) {
        // @ts-ignore
        return Object.assign(new Config, JSON.parse(json))
    }
}

class Pointer extends Data {
    constructor(
        public target: string
    ) {
        super();
    }

    static fromJson(json: string) {
        // @ts-ignore
        return Object.assign(new Config, JSON.parse(json))
    }
}

function getConfig(): Config {
    const configFileName = 'tmmacros.config.json' // named as configZ.json because config.json is taken.
    const configDefaultFileName = 'tmmacros.config_default.json'
    const localPointerFileName = 'LocalPointer.json'
    const localPointerDefaultFileName = 'LocalPointer_default.json'

    let configJson: string;
    try {
        const z2DirUp = path.resolve(path.resolve(process.cwd(), '..'), '..')
        const pointerFile = path.join(z2DirUp, localPointerFileName)
        const pointerJson = fs.readFileSync(pointerFile, 'utf-8')
        const pointer = Pointer.fromJson(pointerJson)
        const configFile = path.resolve(path.join(z2DirUp, pointer.target), configFileName)
        configJson = fs.readFileSync(configFile, 'utf-8')
    } catch (e) {
        try {
            const z2DirUp = path.resolve(path.resolve(process.cwd(), '..'), '..')
            const pointerFile = path.join(z2DirUp, localPointerDefaultFileName)
            const pointerJson = fs.readFileSync(pointerFile, 'utf-8')
            const pointer = Pointer.fromJson(pointerJson)
            const configFile = path.resolve(path.join(z2DirUp, pointer.target), configFileName)
            configJson = fs.readFileSync(configFile, 'utf-8')
        } catch (e) {
            try {
                const configFile = path.join(process.cwd(), configFileName)
                configJson = fs.readFileSync(configFile, 'utf-8')
            } catch (e) {
                try {
                    const configFile = path.join(path.resolve(process.cwd(), '..'), configFileName)
                    configJson = fs.readFileSync(configFile, 'utf-8')
                } catch (e) {
                    try {
                        const configFile = path.join(process.cwd(), configDefaultFileName)
                        configJson = fs.readFileSync(configFile, 'utf-8')
                    } catch (e) {
                        const configFile = path.join(path.resolve(process.cwd(), '..'), configDefaultFileName)
                        configJson = fs.readFileSync(configFile, 'utf-8')
                    }
                }
            }
        }
    }
    return Config.fromJson(configJson)
}

export const config = (() => {
    let cachedConfig: Config;

    return () => {
        if (!cachedConfig) {
            cachedConfig = getConfig();
        }
        return cachedConfig;
    };
})();
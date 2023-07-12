enum OSType {
    Mac,
    Windows,
    Linux
}

export default OSType;

function getOSType(): OSType {
    // @ts-ignore
    switch (process.platform) {
        case 'win32':
            return OSType.Windows;
        case 'darwin':
            return OSType.Mac;
        default:
            return OSType.Linux;
    }
}

export let osType = getOSType();


# How I like to use AppleScript
- Unfortunately, Apple does not allow you to directly bind a script to a key, so you must make 1 service per keybind.
- Unfortunately, changing service keybinds often results in a bug where nothing happens. To fix this, you can restart your computer after changing them. To avoid the obvious annoyance that that brings, I recommend naming the services to be the keybinds that you want, and simply changing the code within that service. That way, you only have to deal with the restart-workaround once.
- Unfortunately, having multiple services makes granting permissions pretty annoying. Also, it seems like the permissions do not apply to libraries that they use. As a workaround, I made KeysetPermissionManager, so that permissions only need to be granted once for all keybinds.
- Unfortunately, granting permissions is very finicky. If you've granted a permission in System Settings -> Privacy & Security -> Accessibility, but it still says you do not have permission.. then you can remove that entry with the "-" button, and try again. It should work the 2nd time.
## So:
- Write a method named YOUR_KEYBIND in Keyset.scpt.
- Create 1 service for that keybind. It should run an applescript.. there should be an example somewhere near.
- assign that service a keybind in System Settings -> Keyboard -> Keyboard Shortcuts -> Services -> General
    You might not see the services you just created. Restart or something.
    It seems like your keybinds do not override others.. as a workaround, you can bind it to F1, F2, etc, and let Karabinder map the key.
    You will need to restart your computer after setting keybinds, as well.
- grant permissions
    If you've granted a permission in System Settings -> Privacy & Security -> Accessibility, but it still says you do not have permission.. then you can remove that entry with the "-" button, and try again. It should work the 2nd time.

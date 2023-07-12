import subprocess

from ._Logger import logz  # noqa


def launch_gitkraken_at_w_justin():
    # TODO: I'm not sure if this works on Mac
    command = r"start gitkraken://repolink/2bf2227c51298b8c34f8170fab9c9e846a4d5dcb/branch/master?url=https%3A%2F%2Fgithub.com%2FMutagen-Modding%2FMutagen.Bethesda.Analyzers.git"
    subprocess.check_output(command, shell=True)


def launch_gitkraken():
    # TODO: I'm not sure if this works on Mac
    command = r"gitkraken"
    subprocess.check_output(command, shell=True)

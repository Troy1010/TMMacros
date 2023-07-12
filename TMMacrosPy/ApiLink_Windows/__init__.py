import os
import importlib

# Get the list of Python files in the package directory
package_dir = os.path.dirname(__file__)
module_files = [file[:-3] for file in os.listdir(package_dir) if file.endswith(".py") and file != "__init__.py"]

# Import all modules dynamically
for module_file in module_files:
    module = importlib.import_module("." + module_file, package=__name__)
    globals()[module_file] = module
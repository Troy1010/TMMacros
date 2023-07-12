import os
import sys

# Get the current directory
current_dir = os.getcwd()

# Go one directory up
parent_dir = os.path.dirname(current_dir)

# Change the current working directory to the parent directory
os.chdir(parent_dir)

#
sys.path.append(parent_dir)

# Get the file name with extension
file_name = os.path.basename(__file__)

# Get the file name without extension
file_name_without_extension = os.path.splitext(file_name)[0]

from TMMacros import API

# Get the method dynamically using getattr()
method = getattr(API, file_name_without_extension)

# Call the method
method()



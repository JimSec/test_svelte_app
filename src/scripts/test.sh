#!/bin/bash

#executes from the project root.

while getopts 'f:t:' flag; do

    case "${flag}" in 
        f) file_path=${OPTARG} ;;
        t) type_name=${OPTARG} ;;
    esac
done


echo "script received arguments type_name: $type_name and file_path: $file_path"

if [[ $type_name == "will fail" ]]; then
    >&2 echo "Script stderr output!!"
    exit 1
fi
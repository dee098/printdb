#!/bin/bash

if [ ! -d "printdb" ]; then
    git clone https://github.com/dee098/printdb.git
else
    echo  printdb exist
fi

if [ ! -d ".venv" ]; then
    python3 -m venv .venv
else
    echo .venv exist
fi
. .venv/bin/activate
cd printdb
pip install -r ./requirements.txt
read -p "Press enter to continue"

python3 app.py
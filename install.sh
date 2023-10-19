#!/bin/bash

python3 -m venv .venv
git clone https://github.com/dee098/printdb.git
. .venv/bin/activate
cd printdb
pip install -r ./requirements.txt
python3 app.py
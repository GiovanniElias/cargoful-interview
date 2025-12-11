## Overview
This is my attempt at Cargoful interview challenge.
This project is pretty straight-forward: it is a CRUD app for (mock) entities that represent the automation of a process.

The frontend is a dashboard, that display KPIs about the runs of the automations.
It offers a way to investigate the status and  other info of recent or upcoming runs.

Backend pretty much just handles creating, reading, updating the entities and returning data to the UI.

It also offers a command to run a (fake) command that will 'run' automations.
This can be run in the terminal, by navigating to folder cargoful-interview/backend and running the command via django manage.

```shell
cd backend
source .venv/bin/activate
python manage.py run_automation
```

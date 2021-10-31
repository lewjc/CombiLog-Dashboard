# CombiLog-Dashboard

[![lewjc](https://circleci.com/gh/lewjc/CombiLog-Dashboard.svg?style=shield&circle-token=40ec36a58de1c2a9498fee07abe989ee774bf874)](https://app.circleci.com/pipelines/github/lewjc/CombiLog-Dashboard)

This repository is the home of the Dashboard in the CombiLog Stack. The Dashboard is used to manage registered services, view realtime logs from your services and view archived logs.

## For Development

Cloning and developing

```
$ git clone https://github.com/lewjc/CombiLog-Dashboard.git combilog-dashboard

$ cd combilog-dashboard && yarn start

```

## Config

- ### Dev

```
cd combilog-dashbord
cp .env.example .env

# make changes to environment variables in .env and save changes
```

- ### Prod

```
 # Docker
 When startng the docker image, environment variables are loaded from the current environment and put into a js
 file that loads the variables into the window. They will be set to the defaults:

 AGGREGATOR_URL=http://localhost:8090
 ARCHIVE_URL=http://localhost:13338
 AGGREGATOR_SOCKET_ADDRESS=ws://localhost:13337

 in order to override them:

 ## Docker Run

    docker run --env AGGREGATOR_URL=http://localhost:8090 --env AGGREGATOR_SOCKET_ADDRESS=ws://localhost:13337 \
        --env ARCHIVE_URL=http://localhost:13338 lewjc/combilog-dashboard:VERSION


 ## Docker Compose

    version: "2.0"
    services:
    dashboard:
        image: lewjc/combilog-dashboard:VERSION
        environment:
          - AGGREGATOR_URL=http://localhost:8090
          - ARCHIVE_URL=http://localhost:13338
          - AGGREGATOR_SOCKET_ADDRESS=ws://localhost:13337
        volumes:
          - combilog-dashboard:/usr/share/nginx/html/config/
        ports:
          - "HOSTPORT:80"

    Passing in those environment variables will overwrite the default values on start.







```

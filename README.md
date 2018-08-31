# Swarmer.io - Orchestrator

This microservice is responsible for spinning up the agents and managing the dashboard/test client->swarmer.io communication.

It assumes that there are tags present on the nodes once spun up. Those tags indicate that they are part of the swarmer.io cluster and have
a number indicating the free # of test runners or docker container allocated spaces.

- `swarmerio-node` -> Indicates that the droplet is part of the cluster
- `free-tr-#` =>  # of free test runner instances
- `free-dc-#` => # of free spaces for docker containers

## Requirements

- NodeJS (8+)
- Docker CE

## Instructions

1) `git clone <this_url> agent && cd agent`  
2) `npm run boot`
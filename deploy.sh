#!/bin/bash
docker build -t spacelama/web:latest .;
docker push spacelama/web:latest;
docker rmi spacelama/web:latest;

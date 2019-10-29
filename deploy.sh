#!/bin/bash
echo Please choose branch to deploy ? [latest/dev] default: dev
read branch

if [[ $branch == "latest" ]]
then
    tag="latest"
else
    tag="dev"
fi
echo "Deploying into $tag branch…"
docker build -t spacelama/web:$tag .;
docker push spacelama/web:$tag;

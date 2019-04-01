#!/bin/bash
echo Please choose branch to deploy ? [master/dev] default: dev
read branch

if [ $branch == "master" ]
then
    tag="latest"
else
    tag="dev"
fi

docker build -t spacelama/web:$tag .;
docker push spacelama/web:$tag;
docker rmi spacelama/web:$tag;

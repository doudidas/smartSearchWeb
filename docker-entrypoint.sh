#!/bin/bash
#this script allow to add the ip and port of the mongoDB database


# 1st parameter is ip
# 2nd parameter is port
if [ "$1" = '' ]; then
    echo "docker run spacelama/api [mongo ip] [mongo port]"
fi

if ["$2" = '']; then
  echo "docker run spacelama/api [mongo ip] [mongo port]"
fi

exec export ip_adress_engine=$1:$2
exec "grunt serve"

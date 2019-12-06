#!/bin/bash
echo Please choose branch to deploy ? [latest/dev] default: dev
read branch

if [[ $branch == "latest" ]]
then
    tag="latest"
else
    tag="dev"
fi

echo "Deploying image:$tag on Docker.io"
docker build -t spacelama/web:$tag .;
docker push spacelama/web:$tag;
echo "Done !"

# echo "Deploying image:$tag on Github"
# # Step 0: Get version
# version=$(cat ./version.txt)
# # Step 1: Authenticate
# docker login docker.pkg.github.com --username doudidas
# # Step 2: Tag
# docker tag spacelama/web:$tag docker.pkg.github.com/doudidas/smartsearchweb/spacelama:$version
# # Step 3: Publish
# docker push docker.pkg.github.com/doudidas/smartsearchweb/spacelama:$version
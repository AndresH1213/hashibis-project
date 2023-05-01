#!/bin/bash

ROOT=$(pwd)

YELLOW="\e[33m"
GREEN="\e[32m"
BLUE="\e[34m"
ENDCOLOR="\e[0m"

STACKS=("medical-history" "order" "personal-information" "product")

compile_layers() {
    STACKS+=("layers")
    for stack in ${STACKS[@]}; do
        cd $stack
        echo -e "${BLUE}Compiling layer of $stack...${ENDCOLOR}"
        npm run build:layer 2>&1 > /dev/null
        cd ..
    done;
}

sls-offline() {
    PORT=310
    LAMBDA_PORT=410
    counter=0
    for stack in ${STACKS[@]}; do
        cd $stack
        if grep -q "serverless-offline" serverless.yml; then
            echo -e "${BLUE}Starting serverless-offline of $stack...${ENDCOLOR}"
            sls offline start --httpPort $PORT$counter --lambdaPort $LAMBDA_PORT$counter &
            pid[$counter]=$!
            let counter++
        fi
        cd ..
    done;
    trap "kill ${pid[0]} ${pid[1]} ${pid[2]} ${pid[3]}; exit 1" INT
    wait
}

build-tables() {
    for stack in ${STACKS[@]}; do
        echo -e "${YELLOW}Building tables of $stack...${ENDCOLOR}"
        aws dynamodb create-table --cli-input-json file://dynamo-tables/$stack.json --endpoint-url http://localhost:8000 2>&1 > /dev/null
    done;
}

remove-tables() {
    for stack in ${STACKS[@]}; do
        echo -e "${YELLOW}Removing tables of $stack...${ENDCOLOR}"
        aws dynamodb delete-table --table-name api-hashibis-$stack-table-dev --endpoint-url http://localhost:8000 2>&1 > /dev/null
    done;
}

run-tests() {
    for stack in ${STACKS[@]}; do
        cd $stack
        echo -e "${GREEN}Running tests of $stack...${ENDCOLOR}"
        npm run test
        cd ..
    done;
}

for arg in "$@"
do
    case $arg in
        --compile-layers)
            compile_layers ;;
        --offline)
            sls-offline ;;
        --build-tables)
            build-tables ;;
        --remove-tables)
            remove-tables ;;
        --run-tests)
            run-tests ;;
        *)
            echo "Invalid option: $arg"
            exit 1
            ;;
    esac
done

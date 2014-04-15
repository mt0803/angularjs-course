#!/bin/bash


echo ""
echo "Starting Karma Server (http://karma-runner.github.io)"
echo $BASE_DIR
echo "-------------------------------------------------------------------"

karma start ../config/karma-e2e.conf.js $*

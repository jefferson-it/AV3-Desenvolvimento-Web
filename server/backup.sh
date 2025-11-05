#!/bin/sh
set -e

mkdir -p backup-out

mongouri="mongodb://database:27017/app"
mongourisec="mongodb://database-sec:27017/app"

timestamp=$(($(date +%s%N)/1000000))
filename="backup-$timestamp.gz"

mongodump --uri="$mongouri" --archive=./backup-out/$filename --gzip
mongorestore --uri="$mongourisec" --archive=./backup-out/$filename --gzip

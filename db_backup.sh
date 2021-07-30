#!/bin/sh

DIR=`date +%d-%b-%Y_%T`
DEST=/root/sld_webApp/db_backups/$DIR
mkdir $DEST
mongodump -d sldWebApp-server -o $DEST
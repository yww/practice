#!/bin/bash
#make dir for report and dashboard
cd /f [ -e ./logs/$1 ]
then
rm -r ./logs/$1
fi
mkdir -p ./logs/$1/dashboard

#exet JMeter file
if [ -e ./cases/$2.jmx ]
then
nohup ./JMeter/bin/jmeter.sh -n -t ./cases/$2.jmx -l ./logs/$1/report.xml -e -o ./logs/$1/dashboard &
echo $!
fi
usr/PTC
if [ -e ./logs/$1 ]
then
rm -r ./logs/$1
fi
mkdir -p ./logs/$1/dashboard

#exet JMeter file
if [ -e ./cases/$2.jmx ]

#!/bin/bash
#make dir for report and dashboard

cd /usr/PTC
if [ -e ./logs/$1 ]
then
rm -r ./logs/$1
fi
mkdir -p ./logs/$1/dashboard

# exet JMeter file
if [ -e ./cases/$2 ]
then
nohup ./JMeter/bin/jmeter.sh -Jjmeter.save.saveservice.output_format=xml -n -t ./cases/$2 -j ./logs/$1/jmeter.log -l ./logs/$1/report.jtl -e -o ./logs/$1/dashboard $3 $4 $5 $6 & echo $!
xsltproc JMeterLogParser.xsl ./logs/$1/report.jtl > ./logs/$1/report.html
fi

# convertFijnstofData.py
# Minor programmeren

import csv

infile = 'fijnstof16-17rawdata.csv'
outfile = 'fijnstof16-17.csv'

# this array will contain per data-point a dictionary
data = []

with open(infile) as csvfile:
    raw_data = csv.reader(csvfile)
    with open(outfile, 'w') as outfile:
        outfile.write("tijdstip,waarde\n")
        for row in raw_data:
            #print(row)
            if row[2] == 'PM10':
                dataPoint = row[0][0:16] + "," + row[3] + "\n"
                print(dataPoint)
                outfile.write(dataPoint)

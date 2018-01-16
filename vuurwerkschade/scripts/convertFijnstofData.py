# convertFijnstofData.py
# Minor programmeren, Project
# This script preprocesses the data found on https://www.luchtmeetnet.nl/
# to a csv file appriopiate to make a linechart.
# Used for all years except 2018.

import csv

# Get files
infile = 'fijnstof16-17rawdata.csv'
outfile = 'fijnstof16-17.csv'

with open(infile) as csvfile:
    raw_data = csv.reader(csvfile)
    with open(outfile, 'w') as outfile:

        # Write first line to file with names of data quantities
        outfile.write("tijdstip,waarde\n")

        # Iterate over lines in infile
        for row in raw_data:

            # Copy relevant parts of lines to outfile
            if row[2] == 'PM10':
                dataPoint = row[0][0:16] + "," + row[3] + "\n"
                outfile.write(dataPoint)
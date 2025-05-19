import csv

writeData = 'StackOverflowDevSurveyData\DevSurveyDataProcessed.csv'
with open(writeData, mode='w', newline='') as f:
    writer = csv.writer(f)

#2011-2016 formatted by commas -- regular csv format
# #2016-2020,2022,2023 formatted by semi-colons

for year in list(range(2011, 2021)) + [2022, 2023]:
    d = dict()
    with open(f'StackOverflowDevSurveyData\DevSurvey{year}.csv', mode = 'r', newline = '') as file:
        if year <= 2015:
            reader = csv.reader(file)
        else:
            reader = csv.reader(file, delimiter=';')
        for row in reader:
            for value in row:
                val = value.lower()
                if val in d.keys():
                    d[val] += 1
                else:
                    d[val] = 1
    with open(writeData, mode='a', newline='') as dataFile:
        writer = csv.writer(dataFile)
        for i in d:
            if i != '' and d[i] > 5:
                writer.writerow([year,i,d[i]])    
    print(f'{year} processed')
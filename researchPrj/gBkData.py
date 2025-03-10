#google books data

import requests
import csv

def query():

    startIndex = 0

    api = "https://www.googleapis.com/books/v1/volumes"
    params = {
        "q": "python programming",
        # "publishedDate": "2008", #doesn't even change anything
        # "startIndex": startIndex,
        "maxResults": 40 #max -- may have to loop -- maybe w/ a while True
                        #or maybe pull out rly big #'s and check if they exist
    }

    r = requests.get(api, params=params)
    
    if r.status_code == 200:
        data = r.json()
        # jprint = json.dumps(data, indent=2) #all data
        # print(jprint)
        
        #pullling only item#, title, author out
        items = data.get("items", [])

        #writing to csv
        with open("gBkData.csv", "w", newline ='') as file:

            header = ['num','title','authors','published date']
            writer = csv.writer(file)
            writer.writerow(header)
            
            for i in range(len(items)): #part after first comma in () are fill-ins in case there isn't a value from google
                                        #was previously doing title = data[items][i]["volumeInfo"][title], but that has no space for error
                                        #code still has an error though
                volumeInfo = items[i].get("volumeInfo",{})
                title = volumeInfo.get("title", "N/A")
                authors = volumeInfo.get("authors",["Unknown"])
                publishedDate = volumeInfo.get("publishedDate","Unknown")
                
                writer.writerow([i+1, title, ", ".join(authors), publishedDate])
                
                print (f'#{i+1}, Title: {title}, Authors: {", ".join(authors)}, Published Date: {publishedDate}')

query()

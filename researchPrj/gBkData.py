#google books data

import requests
import json
import csv

def query():

    startIndex = 0

    api = "https://www.googleapis.com/books/v1/volumes"
    params = {
        "q": "python programming",
        "publishedDate": "2008",
        # "startIndex": startIndex,
        "maxResults": 40 #max -- will have to loop -- maybe w/ a while True
    }

    r = requests.get(api, params=params)
    
    if r.status_code == 200:
        data = r.json()
        # jprint = json.dumps(data, indent=2) #all data
        # print(jprint)
        
        #pullling only item#, title, author out
        items = data["items"]

        #writing to csv
        with open("gBkData.csv", "w", newline ='') as file:

            header = ['num','title','authors']
            writer = csv.writer(file)
            writer.writerow(header)
            
            for i in range(len(items)):
                title = data["items"][i]["volumeInfo"]["title"]
                authors = data["items"][i]["volumeInfo"]["authors"]
                
                writer.writerow([i+1, title, authors])
                
                print (f'#{i+1}, Title: {title}, Authors: {authors}')


                
        #bookmark====================================================^^^^
            
        # with open("gBkScrape.json", "w") as file:
        #     file.write('')
        #     print('contents cleared')
        #     json.dump(data, file)
        #     print('done')

query()

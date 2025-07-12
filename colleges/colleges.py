# import libraries
import requests
import time
import csv
import json

# with open('colleges.csv', mode='w', newline='') as file:
#     pass


# https://www.usnews.com/best-colleges/computer-science-major-1107?_sort=rank&_sortDirection=asc
# Open the webpage

HEADERS = {
  "user-agent": "python-requests/2.32.3"
}
print("starting")

pg = requests.get(f"https://www.usnews.com/best-colleges/api/search?format=json&major=Computer%20Science&_sort=rank&_sortDirection=asc&_page=1", headers = HEADERS)
print("sleeping")
time.sleep(5)
print ("pg downloaded")

if pg.status_code != 200:    
    print("pg not found")

else:
    data = pg.json()
    print("data found")

    schools = data["data"]["hero"]["toggle"]["schools"]


    if not schools:
        print("No more schools")

    else:
        for school in schools:
            print(school["name"])

    
print("end")
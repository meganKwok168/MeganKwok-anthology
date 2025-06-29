# import libraries
import requests
import time
import csv
import json

# with open('colleges.csv', mode='w', newline='') as file:
#     pass

pageNum = 1

# https://www.usnews.com/best-colleges/computer-science-major-1107?_sort=rank&_sortDirection=asc
# Open the webpage

print("starting")

while True:
    print (f"loop {pageNum}")
    time.sleep(0.5)
    print("slept")
    pg = requests.get(f"https://www.usnews.com/best-colleges/api/search?format=json&major=Computer%20Science&_sort=rank&_sortDirection=asc&_page={pageNum}")
    print (f"pg {pageNum} downloaded")

    if pg.status_code != 200:
        print("pg not found")
        break

    data = pg.json()
    print("data found")

    #school names indexed toggle -> schools -> name
    toggle = data.get("toggle", {}) # toggle brackets
    schools = toggle.get("schools", []) #schools is a list
    print ("listing")

    if not schools:
        print("No more schools")
        break

    for school in schools:
        name = school.get("name", "N/A")
        print("hi")
        print(name)
    pageNum += 1
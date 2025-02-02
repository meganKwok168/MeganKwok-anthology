# import libraries
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import csv

with open('webscraper.csv', mode='w', newline='') as file:
    pass

# Set up ChromeDriver 
cService = Service(executable_path=r"chromedriver-win64\chromedriver-win64\chromedriver.exe")
driver = webdriver.Chrome(service=cService)

# Open the webpage
driver.get("https://www.societyforscience.org/regeneron-sts/2025-finalists/")
time.sleep(1)

# names =================================================================
# <h3 class="text-group-title">-
# <a class = "anchor" name = "a;sdkjf"></a>
# asdflh
# </h3>
names = driver.find_elements(By.XPATH, '//h3[@class="text-group-title"]')
names_list = []

# prj titles =============================================================
prjs = driver.find_elements(By.XPATH, '//div[@class="text-group-description wysiwyg"]/p[2]')
prjs_list = []


for i in range(0,40):
    names_list.append(names[i].text)
    prjsText = prjs[i].text.replace("Project Title: ", "")
    prjs_list.append(prjsText)
    new_row=(names[i].text, prjsText)
    with open('webscraper.csv', mode = 'a', newline='') as file:
        writer=csv.writer(file)
        writer.writerow(new_row)
    print(f"{i}: {names[i].text} - {prjsText}")

    


driver.close()
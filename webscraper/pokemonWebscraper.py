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
driver.get("https://www.pokemon.com/us/pokedex")
time.sleep(50)

# names =================================================================
# <h3 class="text-group-title">-
# <a class = "anchor" name = "a;sdkjf"></a>
# asdflh
# </h3>

ids = driver.find_elements(By.XPATH, '//p[@class="id"]')
ids_list = []

# prj titles =============================================================
names = driver.find_elements(By.XPATH, '//div[@class="pokemon-info"]/h5')
names_list = []


for i in range(len(ids)):
    ids_list.append(ids[i].text)
    names_list.append(names[i].text)
    new_row=(ids[i].text, names[i].text)
    with open('webscraper.csv', mode = 'a', newline='') as file:
        writer=csv.writer(file)
        writer.writerow(new_row)
    print(f"{i}: {ids[i].text} - {names[i].text}")

    


driver.close()
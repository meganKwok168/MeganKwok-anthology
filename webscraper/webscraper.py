# import libraries
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import pandas as pd

url = "https://www.societyforscience.org/regeneron-sts/2025-finalists/"


# Set up ChromeDriver (Replace with your actual path)
service = Service("path/to/chromedriver")  # Example: "C:/chromedriver.exe"
driver = webdriver.Chrome(service=service)

# Open the webpage
driver.get("https://www.societyforscience.org/regeneron-sts/2025-finalists/")

# Wait for JavaScript to load (adjust if needed)
time.sleep(5)  

# Get the fully loaded HTML
html = driver.page_source

# Print the HTML (for debugging)
print(html)

# Close browser
driver.quit()
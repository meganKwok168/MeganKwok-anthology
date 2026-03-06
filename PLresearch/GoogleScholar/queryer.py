import requests
from bs4 import BeautifulSoup

phrase = "python programming"

payload={
    "url": "https://www.reddit.com/",
    "source": "reddit",
}

try: 
    response = requests.post(
        "reddit.com/login",
        auth(USERNAME,PASSWORD),
        json=payload,
    )
    response.raise_for_status()
except requests.exceptions.RequestException as e:
    print(f"Request failed: {e}")
    raise
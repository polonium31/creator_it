import requests
from bs4 import BeautifulSoup
import re

def cleanhtml(CLEANR, raw_html):
    cleantext = re.sub(CLEANR, '', raw_html)
    return cleantext

def get_titles(keyword = "Hello"):
    url = "https://www.title-generator.com/best-online-title-generator.html?qs="+keyword+"&page=1"

    req = requests.get(url)
    content = BeautifulSoup(req.content, 'html.parser')
    CLEANR = re.compile('<.*?>') 

    titles = str(content.findAll('td'))
    titles = cleanhtml(CLEANR, titles)
    string = titles.split("[")[1]
    elements = string.split(",")

    json = dict()
    for i in range(0, len(elements)-1, 2):
        json[elements[i]] = elements[i+1].strip()

    titles_1 = list()
    for key, val in json.items():
        try:
            if int(key):
                titles_1.append(val)
        except:
            titles_1.append(key)

    final_json = dict()
    for key, value in zip(range(20), titles_1):
        final_json[key] = value.strip()
    return final_json
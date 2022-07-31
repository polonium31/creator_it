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
    return json
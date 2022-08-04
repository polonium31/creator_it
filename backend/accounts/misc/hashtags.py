import requests
from bs4 import BeautifulSoup

def get_hashtags(keyword):
    url = "https://top-hashtags.com/hashtag/"+keyword

    req = requests.get(url)
    content = BeautifulSoup(req.content, 'html.parser')
    hashTags = content.findAll('div',{'id':"clip-tags-1"})
    hashTags2 = content.findAll('div',{'id':"clip-tags-2"})
    li = []
    li2 = []
    for i in hashTags:
        li = i.text

    for i in hashTags2:
        li2 = i.text

    final_hashtags = li.split()
    final_hashtags2 = li2.split()
    final = final_hashtags + final_hashtags2
    final_dict = {idx: element for idx, element in zip(range(len(final)), final)}

    return final_dict
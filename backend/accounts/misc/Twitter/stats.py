import os
from dotenv import load_dotenv

# from wordcloud import WordCloud
# from textblob import TextBlob
import re
import time
import requests
import json
from bs4 import BeautifulSoup

load_dotenv()

bearer =  os.getenv("bearer")
consumer_key = os.getenv("consumer_key")
consumer_secret = os.getenv("consumer_secret")
access_token = os.getenv("access_token")
access_token_secret = os.getenv("access_token_secret")

def get_twitter_stats(username):
    print(username)
    os.environ['TOKEN'] = bearer
    def auth():
        return os.getenv('TOKEN')

    def create_headers(bearer_token):
        headers = {"Authorization": "Bearer {}".format(bearer_token)}
        return headers

    def create_url(username):
        search_url = "https://api.twitter.com/2/users/by/username/"+username 
        fields = "public_metrics,id,location,name,username,profile_image_url"
        params = {"user.fields": fields}
        return (search_url, params)

    def connect_to_endpoint(url, headers, params):
        response = requests.request("GET", url, headers = headers, params = params)
        print("Endpoint Response Code: " + str(response.status_code))
        if response.status_code != 200:
            raise Exception(response.status_code, response.text)
        return response.json()

    bearer_token = auth()
    headers = create_headers(bearer_token)

    # username = input("Enter Username: ")
    url = create_url(username)
    json_response = connect_to_endpoint(url[0], headers,url[1])
    d = json.dumps(json_response, indent=4, sort_keys=True)
    data = json.loads(d)
    url = "https://www.sotwe.com/"+username

    req = requests.get(url)
    content = BeautifulSoup(req.content, 'html.parser')
    time.sleep(1)
    profile_details = content.findAll('span',{'class':"mr-4"})
    titles = str(profile_details)
    CLEANR = re.compile('<.*?>') 

    def cleanhtml(raw_html):
        return re.sub(CLEANR, '', raw_html)

    def humanNumberToNormal(number):
        x = number[-1]
        number = number.replace(x,'')
        final = float(number)
        units = {
            'K':1000, 
            'M':1000000, 
            'B':1000000000,
            'T':1000000000000,
            'Q':1000000000000000
        }
        y = units[x]
        return int(final*y)
    titles = cleanhtml(titles)
    titles = titles.replace("Share",'')
    titles = titles.replace("Download Image",'')
    titles = titles.replace("Download Video",'')
    titles = titles.replace("[",'')
    titles = titles.replace("]",'')
    titles = titles.replace(' ','')
    titles = titles.split(',')
    for i in range(len(titles)):
        try:
            titles[i] = int(titles[i])
        except ValueError:
            titles[i] = humanNumberToNormal(titles[i])

    likes = 0
    retweets = 0
    tweets = int(len(titles)/2)
    for i in range(len(titles)):
        if i%2!=0:
            likes +=titles[i]
        else:
            retweets +=titles[i]
    name = data['data']['name']
    username = data['data']['username']
    profile_image_url = data['data']['profile_image_url']
    followers_count = data['data']['public_metrics']['followers_count']
    engagement = str(round(((likes+retweets)/tweets)/followers_count,3))+"%"
    final_dict = {
        'User Name':name,
        'User Username':username,
        'User Followers Count':followers_count,
        'Engagement Rate':engagement,
        'Profile URL':profile_image_url,
    }
    return final_dict
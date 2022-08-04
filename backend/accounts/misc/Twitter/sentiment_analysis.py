# pip install tweepy
# pip install flair
# pip install googletrans==3.1.0a0
# pip install fsspec

from googletrans import Translator
from wordcloud import WordCloud
from textblob import TextBlob
# import tweepy
import re   
# import time
import requests
import os 
import json
# import numpy as np
# import pandas as pd
import matplotlib.pyplot as plt
from pandas import json_normalize
from dotenv import load_dotenv
import base64

load_dotenv()

bearer =  os.getenv("bearer")
consumer_key = os.getenv("consumer_key")
consumer_secret = os.getenv("consumer_secret")
access_token = os.getenv("access_token")
access_token_secret = os.getenv("access_token_secret")

def get_twitter_sentiment(hashtag):
    os.environ['TOKEN'] = bearer

    def auth():
        return os.getenv('TOKEN')

    def create_headers(bearer_token):
        headers = {"Authorization": "Bearer {}".format(bearer_token)}
        return headers

    def create_url_hashtweets(keyword,max_results = 10):
        
        search_url = "https://api.twitter.com/2/tweets/search/recent" #Change to the endpoint you want to collect data from

        #change params based on the endpoint you are using
        query_params = {'query': keyword,
                        'max_results': max_results,
                        'next_token': {}
                        }
        return (search_url, query_params)

    def connect_to_endpoint(url, headers, params, next_token = None):
        params['next_token'] = next_token   #params object received from create_url function
        response = requests.request("GET", url, headers = headers, params = params)
        print("Endpoint Response Code: " + str(response.status_code))
        if response.status_code != 200:
            raise Exception(response.status_code, response.text)
        return response.json()

    bearer_token = auth()
    headers = create_headers(bearer_token)
    keyword = hashtag
    max_results = 100

    url = create_url_hashtweets(keyword, max_results)
    json_response = connect_to_endpoint(url[0], headers, url[1])
    d = json.dumps(json_response, indent=4, sort_keys=True)
    data = json.loads(d)
    df = json_normalize(data['data']) 

    df = df.drop(columns=['id'])

    translator = Translator()
    df_en = df.copy()
    translations = {}
    for column in df_en.columns:
        unique_elements = df_en[column].unique()
        for element in unique_elements:
            translations[element] = translator.translate(element).text
    df_en.replace(translations, inplace = True)

    def preprocess_text(text):
        # convert to lower case
        text = text.lower()
        # remove user handle
        text = re.sub("@[\w]*","",text)
        # remove http links
        text = re.sub("http\S+","",text) 
        # remove digits and spl char
        text = re.sub("[^a-zA-Z#]"," ",text)
        # remove rt char
        text = re.sub("rt","",text)
        # remove additional spaces
        text = re.sub("\s+"," ",text) 

        return text


    df_en['text'] = df_en['text'].apply(preprocess_text)

    def getSubjectivity(text):
        return TextBlob(text).sentiment.subjectivity

    def getPolarity(text):
        return TextBlob(text).sentiment.polarity

    df_en['Subjectivity'] = df_en['text'].apply(getSubjectivity)
    df_en['Polarity'] = df_en['text'].apply(getPolarity)

    allWords = ' '.join([twts for twts in df_en['text']])
    wordCloud = WordCloud(width =500,height = 300,random_state = 21,max_font_size = 119).generate(allWords)
    plt.imshow(wordCloud,interpolation = 'bilinear')
    plt.axis('off')
    plt.savefig("accounts\misc\Twitter\output\output1.png")
    # plt.show()

    def getAnalysis(score):
        if score <0:
            return 'Negative'
        elif score == 0:
            return 'Neutral'
        else:
            return 'Positive'

    df_en['Analysis'] = df_en['Polarity'].apply(getAnalysis)
    # df_en

    j = 1
    sortedDF = df_en.sort_values(by=['Polarity'])
    for i in range(0,sortedDF.shape[0]):
        if (sortedDF['Analysis'][i] == 'Positive'):
            print(str(j)+')'+sortedDF['text'][i])
            print()
            j = j+1

    j = 1
    sortedDF = df_en.sort_values(by=['Polarity'],ascending=False)
    for i in range(0,sortedDF.shape[0]):
        if (sortedDF['Analysis'][i] == 'Negative'):
            print(str(j)+')'+sortedDF['text'][i])
            print()
            j = j+1

    plt.figure(figsize=(8,6))
    for i in range(0,df_en.shape[0]):
        plt.scatter(df_en['Polarity'][i],df_en['Subjectivity'][i],color='Blue')
    plt.title('Sentiment Analysis')
    plt.xlabel('Polarity')
    plt.ylabel('Subjectivity')
    plt.savefig("accounts\misc\Twitter\output\output2.png")
    # plt.show()

    ptweets = df_en[df_en.Analysis == 'Positive']
    ptweets = ptweets['text']

    pt = round((ptweets.shape[0]/df_en.shape[0])*100,1)

    ntweets = df_en[df_en.Analysis == 'Negative']
    ntweets = ntweets['text']

    nt = round((ntweets.shape[0]/df_en.shape[0])*100,1)

    overall_result = ""
    if nt<pt:
        overall_result = "Positive"
    else:
        overall_result = "Negative"

    with open("accounts\misc\Twitter\output\output1.png", "rb") as image2string:
        word_cloud_img = str(base64.b64encode(image2string.read()))
    
    with open("accounts\misc\Twitter\output\output2.png", "rb") as image2string:
        sentiment_analysis_img = str(base64.b64encode(image2string.read()))
    
    print("Positive : ", pt)
    print("Negative: ", nt)
    return {"Overall Sentiment": overall_result,
            "Positive": pt,
            "Negative": nt,
            "Word Cloud Image": word_cloud_img,
            "Sentiment Analysis Image": sentiment_analysis_img} 
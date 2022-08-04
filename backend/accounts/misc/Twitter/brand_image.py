# pip install tweepy
# pip install flair
# pip install googletrans==3.1.0a0
# pip install fsspec

from googletrans import Translator
from wordcloud import WordCloud
from textblob import TextBlob
# import tweepy
import re   
import requests
import os 
import json
from pandas import json_normalize
from dotenv import load_dotenv

load_dotenv()

bearer =  os.getenv("bearer")
consumer_key = os.getenv("consumer_key")
consumer_secret = os.getenv("consumer_secret")
access_token = os.getenv("access_token")
access_token_secret = os.getenv("access_token_secret")

def get_twitter_brand_image(username):
    os.environ['TOKEN'] = bearer
    def auth():
        return os.getenv('TOKEN')
    def create_headers(bearer_token):
        headers = {"Authorization": "Bearer {}".format(bearer_token)}
        return headers

    def create_url_hashtweets(keyword,max_results = 10):
        
        search_url = "https://api.twitter.com/2/tweets/search/recent"
        query_params = {'query': keyword,
                        'max_results': max_results,
                        'next_token': {}
                        }
        return (search_url, query_params)

    def connect_to_endpoint_hasttweets(url, headers, params, next_token = None):
        params['next_token'] = next_token 
        response = requests.request("GET", url, headers = headers, params = params)
        print("Endpoint Response Code: " + str(response.status_code))
        if response.status_code != 200:
            raise Exception(response.status_code, response.text)
        return response.json()

    def create_url_user_id(username):
        search_url = "https://api.twitter.com/2/users/by/username/"+username 
        fields = "public_metrics,id,location,name,username,profile_image_url"
        params = {"user.fields": fields}
        return (search_url, params)

    def connect_to_endpoint_user_id(url, headers, params):
        response = requests.request("GET", url, headers = headers, params = params)
        print("Endpoint Response Code: " + str(response.status_code))
        if response.status_code != 200:
            raise Exception(response.status_code, response.text)
        return response.json()

    def create_url_tweets(username_id):
        search_url = "https://api.twitter.com/2/users/"+username_id+"/tweets?max_results=50"
        return search_url

    def connect_to_endpoint_tweets(url, headers):
        response = requests.request("GET", url, headers = headers)
        print("Endpoint Response Code: " + str(response.status_code))
        if response.status_code != 200:
            raise Exception(response.status_code, response.text)
        return response.json()

    bearer_token = auth()
    headers = create_headers(bearer_token)

    # username = input("Enter Username: ")
    url = create_url_user_id(username)
    json_response = connect_to_endpoint_user_id(url[0], headers,url[1])
    d = json.dumps(json_response, indent=4, sort_keys=True)
    data = json.loads(d)
    user_id = data['data']['id']
    user_name = str(data['data']['name']).replace(" ", "")
    print(data)
    print(user_name)
    print(user_id)

    bearer_token = auth()
    headers = create_headers(bearer_token)
    max_results = 100

    url = create_url_hashtweets(user_name, max_results)
    json_response = connect_to_endpoint_hasttweets(url[0], headers, url[1])
    d = json.dumps(json_response, indent=4, sort_keys=True)
    hashtweets = json.loads(d)
    data_hashtweets = json_normalize(hashtweets['data']) 

    url = create_url_tweets(user_id)
    json_response = connect_to_endpoint_tweets(url, headers)
    d = json.dumps(json_response, indent=4, sort_keys=True)
    data = json.loads(d)
    df_tweets = json_normalize(data['data']) 

    df_tweets = df_tweets.drop(columns=['id'])
    data_hashtweets = data_hashtweets.drop(columns=['id'])

    translator = Translator()
    df_en_tweets = df_tweets.copy()
    translations = {}
    for column in df_en_tweets.columns:
        unique_elements = df_en_tweets[column].unique()
        for element in unique_elements:
            translations[element] = translator.translate(element).text
    df_en_tweets.replace(translations, inplace = True)

    df_en_hashtweets = data_hashtweets.copy()
    translations = {}
    for column in df_en_hashtweets.columns:
        unique_elements = df_en_hashtweets[column].unique()
        for element in unique_elements:
            translations[element] = translator.translate(element).text
    df_en_hashtweets.replace(translations, inplace = True)

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


    df_en_tweets['text'] = df_en_tweets['text'].apply(preprocess_text)
    df_en_hashtweets['text'] = df_en_hashtweets['text'].apply(preprocess_text)

    def getSubjectivity(text):
        return TextBlob(text).sentiment.subjectivity

    def getPolarity(text):
        return TextBlob(text).sentiment.polarity

    df_en_tweets['Subjectivity'] = df_en_tweets['text'].apply(getSubjectivity)
    df_en_tweets['Polarity'] = df_en_tweets['text'].apply(getPolarity)

    df_en_hashtweets['Subjectivity'] = df_en_hashtweets['text'].apply(getSubjectivity)
    df_en_hashtweets['Polarity'] = df_en_hashtweets['text'].apply(getPolarity)

    def getAnalysis(score):
        if score <0:
            return 'Negative'
        elif score == 0:
            return 'Neutral'
        else:
            return 'Positive'

    df_en_tweets['Analysis'] = df_en_tweets['Polarity'].apply(getAnalysis)
    df_en_hashtweets['Analysis'] = df_en_hashtweets['Polarity'].apply(getAnalysis)

    # sortedDF_tweets = df_en_tweets.sort_values(by=['Polarity'])
    # sortedDF_hashtweets = df_en_hashtweets.sort_values(by=['Polarity'])

    # sortedDF_tweets = df_en_tweets.sort_values(by=['Polarity'],ascending='False')
    # sortedDF_hashtweets = df_en_hashtweets.sort_values(by=['Polarity'],ascending='False')

    ptweets = df_en_tweets[df_en_tweets.Analysis == 'Positive']
    ptweets = ptweets['text']

    phashtweets = df_en_hashtweets[df_en_hashtweets.Analysis == 'Positive']
    phashtweets = phashtweets['text']

    pt_tweets = round((ptweets.shape[0]/df_en_tweets.shape[0])*100,1)
    pt_hashtweets = round((phashtweets.shape[0]/df_en_hashtweets.shape[0])*100,1)

    final_pt =pt_tweets+ pt_hashtweets

    ntweets = df_en_tweets[df_en_tweets.Analysis == 'Negative']
    ntweets = ntweets['text']

    nhashtweets = df_en_hashtweets[df_en_hashtweets.Analysis == 'Negative']
    nhashtweets = nhashtweets['text']

    nt_tweets = round((ntweets.shape[0]/df_en_tweets.shape[0])*100,1)
    nt_hashtweets = round((nhashtweets.shape[0]/df_en_hashtweets.shape[0])*100,1)

    final_nt = nt_tweets+ nt_hashtweets

    overall_result = ""
    if final_nt<final_pt:
        overall_result = "Positive"
    else:
        overall_result = "Negative"

    print("Positive : ", final_pt)
    print("Negative: ", final_nt)

    return {"Overall Sentiment": overall_result,
            "Positive": final_pt,
            "Negative": final_nt}
import imp
import re
from django.http import JsonResponse
import requests
from accounts.misc.hashtags import get_hashtags
from accounts.misc.titles import get_titles

from accounts.misc.YouTube.stats import get_youtube_stats

from accounts.misc.Twitter.stats import get_twitter_stats
from accounts.misc.Twitter.sentiment_analysis import get_twitter_sentiment

def get_results(request, Item, Id, SubItem, SubId):
    token = request.META.get("HTTP_TOKEN", "")
    if token:
        token = token.split(" ")[1]
    else:
        token = ""
    authenticated = requests.post("http://127.0.0.1:8000/auth/jwt/verify", json={"token": str(token)}).status_code
    keyword = request.GET.get("keyword")
    url = request.GET.get("url")
    username = request.GET.get("username")
    hashtag = request.GET.get("hashtag")
    print(hashtag)
    # print(username)
    if authenticated == 200:
        if Item == "YouTube":
            if url or keyword:
                # print(keyword)
                result = youtube(Id, SubItem, SubId, url, keyword)
            else:
                return JsonResponse(status = 400,data = {"Bad Request": "Check request parameters ..."})
            # elif keyword:
            #     result = youtube(Id, SubItem, SubId, keyword)
            return JsonResponse({"youtube_result": result})
        elif Item == "Instagram":
            if keyword:
                result = instagram(Id, SubItem, SubId, keyword)
            else:
                result = instagram(Id, SubItem, SubId)
            return JsonResponse({"instagram_result": result})
        elif Item == "Twitter":
            if username or keyword or hashtag:
                result = twitter(Id, SubItem, SubId, username, keyword, hashtag)
            else:
                return JsonResponse(status = 400,data = {"Bad Request": "Check request parameters ..."})
            # elif keyword:
            #     result = twitter(Id, SubItem, SubId, keyword)
            return JsonResponse({"twitter_result": result})
        elif Item == "ALLInOne":
            result = allinone(Id, SubItem, SubId, keyword)
            return JsonResponse({"allinone_result": result})
        elif Item == "LinkedIn":
            result = linkedin(Id, SubItem, SubId, keyword)
            return JsonResponse({"linkedin_result": result})
        else:
            return JsonResponse(status = 404,data = {"URL Not Found !": "None"})
    elif not token:
        return JsonResponse(status = 401,data = {"Unauthorized access !": "LogIn to access."})
    else:
        return JsonResponse(status = 404,data = {"Invalid credentials !": "Token not provided or Invalid"})

def youtube(Id, SubItem, SubId, url, keyword):
    # print(SubItem)
    if SubItem == "Trending Hashtags Prediction":
        final_dict = get_hashtags(keyword)
    elif  SubItem == "Trending Title Prediction":
        final_dict = get_titles(keyword)
    elif SubItem == "YouTube Stats":
        final_dict = get_youtube_stats(url)
    # print(final_dict)
    context = {
        "YouTube_Id": Id,
        "YouTube_SubItem": SubItem,
        "YouTube_SubId": SubId,
        "Result": final_dict,
    }
    return ({"context": context})

def instagram(Id, SubItem, SubId, keyword):
    if SubItem == "Trending Hashtags Prediction":
        final_dict = get_hashtags(keyword)
    elif  SubItem == "Trending Title Prediction":
        final_dict = get_titles(keyword)
    # print(final_dict)
    # final_dict = get_hashtags(keyword)

    context = {
        "Instagram_Id": Id,
        "Instagram_SubItem": SubItem,
        "Instagram_SubId": SubId,
        "Result": final_dict,
    }
    return ({"context": context})

def twitter(Id, SubItem, SubId, username, keyword, hashtag):
    if SubItem == "Trending Hashtags Prediction":
        final_dict = get_hashtags(keyword)
    elif SubItem == "Twitter Stats":
        final_dict = get_twitter_stats(username)
    elif SubItem == "Hashtag Sentiment Analysis":
        final_dict = get_twitter_sentiment(hashtag)
        # print(hashtag)

    context = {
        "Twitter_Id": Id,
        "Twitter_SubItem": SubItem,
        "Twitter_SubId": SubId,
        SubItem: final_dict,
    }
    return ({"context": context})

def linkedin(Id, SubItem, SubId, keyword):
    final_dict = get_hashtags(keyword)

    context = {
        "LinkedIn_Id": Id,
        "LinkedIn_SubItem": SubItem,
        "LinkedIn_SubId": SubId,
        "HashTags": final_dict,
    }
    return ({"context": context})

def allinone(Id, SubItem, SubId, keyword):
    final_dict = get_hashtags(keyword)

    context = {
        "AllInOne_Id": Id,
        "AllInOne_SubItem": SubItem,
        "AllInOne_SubId": SubId,
        "HashTags": final_dict,
    }
    return ({"context": context})
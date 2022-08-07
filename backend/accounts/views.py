from django.http import JsonResponse
import requests
from accounts.misc.hashtags import get_hashtags
from accounts.misc.titles import get_titles

from accounts.misc.YouTube.stats import get_youtube_stats

from accounts.misc.Twitter.stats import get_twitter_stats
from accounts.misc.Twitter.sentiment_analysis import get_twitter_sentiment
from accounts.misc.Twitter.brand_image import get_twitter_brand_image

def get_results(request, Item, Id, SubItem, SubId):
    token = request.META.get("HTTP_TOKEN", "")
    if token:
        token = token.split(" ")[1]
    else:
        token = ""
    authenticated = requests.post("http://127.0.0.1:8000/auth/jwt/verify", json={"token": str(token)}).status_code
    input = request.GET.get("input")
    url = request.GET.get("url")
    username = request.GET.get("username")
    hashtag = request.GET.get("hashtag")
    brand = request.GET.get("brand")
    print(hashtag)
    # print(username)
    if authenticated == 200:
        if Item == "YouTube":
            if input:
                # print(input)
                result = youtube(Id, SubItem, SubId, input)
            else:
                return JsonResponse(status = 400,data = {"Bad Request": "Check request parameters ..."})
            # elif input:
            #     result = youtube(Id, SubItem, SubId, input)
            return JsonResponse({"youtube_result": result})
        elif Item == "Instagram":
            if input:
                result = instagram(Id, SubItem, SubId, input)
            else:
                result = instagram(Id, SubItem, SubId)
            return JsonResponse({"instagram_result": result})
        elif Item == "Twitter":
            if input:
                result = twitter(Id, SubItem, SubId, input)
            else:
                return JsonResponse(status = 400,data = {"Bad Request": "Check request parameters ..."})
            # elif input:
            #     result = twitter(Id, SubItem, SubId, input)
            return JsonResponse({"twitter_result": result})
        elif Item == "ALLInOne":
            result = allinone(Id, SubItem, SubId, input)
            return JsonResponse({"allinone_result": result})
        elif Item == "LinkedIn":
            result = linkedin(Id, SubItem, SubId, input)
            return JsonResponse({"linkedin_result": result})
        else:
            return JsonResponse(status = 404,data = {"URL Not Found !": "None"})
    elif not token:
        return JsonResponse(status = 401,data = {"Unauthorized access !": "LogIn to access."})
    else:
        return JsonResponse(status = 404,data = {"Invalid credentials !": "Token not provided or Invalid"})

def youtube(Id, SubItem, SubId, input):
    # print(SubItem)
    if SubItem == "Trending Hashtags Prediction":
        final_dict = get_hashtags(input)
    elif  SubItem == "Trending Title Prediction":
        final_dict = get_titles(input)
    elif SubItem == "YouTube Stats":
        final_dict = get_youtube_stats(input)
    # print(final_dict)
    context = {
        "YouTube_Id": Id,
        "YouTube_SubItem": SubItem,
        "YouTube_SubId": SubId,
        "Result": final_dict,
    }
    return ({"context": context})

def instagram(Id, SubItem, SubId, input):
    if SubItem == "Trending Hashtags Prediction":
        final_dict = get_hashtags(input)
    elif  SubItem == "Trending Title Prediction":
        final_dict = get_titles(input)
    # print(final_dict)
    # final_dict = get_hashtags(input)

    context = {
        "Instagram_Id": Id,
        "Instagram_SubItem": SubItem,
        "Instagram_SubId": SubId,
        "Result": final_dict,
    }
    return ({"context": context})

def twitter(Id, SubItem, SubId, input):
    if SubItem == "Trending Hashtags Prediction":
        final_dict = get_hashtags(input)
    elif SubItem == "Twitter Stats":
        final_dict = get_twitter_stats(input)
    elif SubItem == "Hashtag Sentiment Analysis":
        final_dict = get_twitter_sentiment(input)
    elif SubItem == "Brand Image Analysis":
        final_dict = get_twitter_brand_image(input)

    context = {
        "Twitter_Id": Id,
        "Twitter_SubItem": SubItem,
        "Twitter_SubId": SubId,
        SubItem: final_dict,
    }
    return ({"context": context})

def linkedin(Id, SubItem, SubId, input):
    final_dict = get_hashtags(input)

    context = {
        "LinkedIn_Id": Id,
        "LinkedIn_SubItem": SubItem,
        "LinkedIn_SubId": SubId,
        "HashTags": final_dict,
    }
    return ({"context": context})

def allinone(Id, SubItem, SubId, input):
    final_dict = get_hashtags(input)

    context = {
        "AllInOne_Id": Id,
        "AllInOne_SubItem": SubItem,
        "AllInOne_SubId": SubId,
        "HashTags": final_dict,
    }
    return ({"context": context})
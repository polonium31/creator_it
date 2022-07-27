from django.http import JsonResponse
import requests
from accounts.misc.hashtags import get_hashtags

def get_results(request, Item, Id, SubItem, SubId):
    token = request.META.get("HTTP_TOKEN", "")
    if token:
        token = token.split(" ")[1]
    else:
        token = ""
    authenticated = requests.post("http://127.0.0.1:8000/auth/jwt/verify", json={"token": str(token)}).status_code
    keyword = request.GET.get("keyword")
    if authenticated == 200:
        if Item == "YouTube":
            if keyword:
                result = youtube(Id, SubItem, SubId, keyword)
            else:
                result = youtube(Id, SubItem, SubId)
            return JsonResponse({"youtube_result": result})
        elif Item == "Instagram":
            result = instagram(Id, SubItem, SubId, keyword)
            return JsonResponse({"instagram_result": result})
        elif Item == "Twitter":
            result = twitter(Id, SubItem, SubId, keyword)
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

def youtube(Id, SubItem, SubId, keyword="Hello"):
    
    final_dict = get_hashtags(keyword)

    context = {
        "YouTube_Id": Id,
        "YouTube_SubItem": SubItem,
        "YouTube_SubId": SubId,
        "HashTags": final_dict,
    }
    return ({"context": context})

def instagram(Id, SubItem, SubId, keyword):
    final_dict = get_hashtags(keyword)

    context = {
        "Instagram_Id": Id,
        "Instagram_SubItem": SubItem,
        "Instagram_SubId": SubId,
        "HashTags": final_dict,
    }
    return ({"context": context})

def twitter(Id, SubItem, SubId, keyword):
    final_dict = get_hashtags(keyword)

    context = {
        "Twitter_Id": Id,
        "Twitter_SubItem": SubItem,
        "Twitter_SubId": SubId,
        "HashTags": final_dict,
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
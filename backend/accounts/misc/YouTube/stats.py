# pip install --upgrade google-api-python-client
from googleapiclient.discovery import build
import pandas as pd
import urllib
import os
from dotenv import load_dotenv

def get_youtube_stats(url):

    def code_of_site(url):
        weburl = urllib.request.urlopen(url)
        code = weburl.read()
        return code

    # url = input("Enter URL: ")
    source_code = code_of_site(url)
    youtube_channel_id = str(source_code)
    index = youtube_channel_id.find("channelId")
    a = ""
    while youtube_channel_id[index] != ',':
        a = a + youtube_channel_id[index]
        index = index + 1
    a = a.replace('"', '')
    a = a.replace('channelId:', '')
    channel_id = a
    # print(channel_id)

    load_dotenv()

    api_key = os.getenv("api_key")
    #channel_id = 'UCnz-ZXXER4jOvuED5trXfEA'
    channel_ids = channel_id

    youtube = build('youtube', 'v3', developerKey=api_key)

    def get_channel_stats(youtube, channel_ids):
        all_data = []
        request = youtube.channels().list(
                    part='snippet,contentDetails,statistics',
                    id=channel_ids)
        response = request.execute() 
        # print(response)
        for i in range(len(response['items'])):
            data = dict(Channel_name = response['items'][i]['snippet']['title'],
                        Subscribers = response['items'][i]['statistics']['subscriberCount'],
                        Views = response['items'][i]['statistics']['viewCount'],
                        Total_videos = response['items'][i]['statistics']['videoCount'],
                        channel_profile_url = response['items'][i]['snippet']['thumbnails']['default']['url'])
            all_data.append(data)
        
        return all_data

    channel_statistics = get_channel_stats(youtube, channel_ids)

    channel_data = pd.DataFrame(channel_statistics)

    channel_data['Subscribers'] = pd.to_numeric(channel_data['Subscribers'])
    channel_data['Views'] = pd.to_numeric(channel_data['Views'])
    channel_data['Total_videos'] = pd.to_numeric(channel_data['Total_videos'])

    channel_data['sum_stat'] = channel_data['Views']+channel_data['Subscribers']+channel_data['Total_videos']
    # channel_data

    def get_channel_video_data():
        request = youtube.search().list(
                            part='snippet',
                            channelId=channel_ids,
                            maxResults=13)
        response = request.execute()
        channel_videos = dict()
        channel_playlists = dict()
        for item in response['items']:
            try:
                kind = item['id']['kind']
                published_at = item['snippet']['publishedAt']
                title = item['snippet']['title']
                if kind == 'youtube#video':
                    video_id = item['id']['videoId']
                    channel_videos[video_id] = {'publishedAt': published_at, 'title': title}
                elif kind == 'youtube#playlist':
                    playlist_id = item['id']['playlistId']
                    channel_playlists[playlist_id] = {'publishedAt': published_at, 'title': title}
            except KeyError as e:
                print('Error! Could not extract data from item:\n', item)

        return channel_videos
    x = get_channel_video_data()

    video_id_data = pd.DataFrame(x)
    video_id_data = video_id_data.T
    video_id_data = video_id_data.reset_index()
    video_id_data = video_id_data['index']
    video_ids = list(video_id_data)

    def get_video_details(youtube, video_ids):
        all_video_stats = []
        
        for i in range(0, len(video_ids), 50):
            request = youtube.videos().list(
                        part='snippet,statistics',
                        id=','.join(video_ids[i:i+50]))
            response = request.execute()
            
            for video in response['items']:
                video_stats = dict(Title = video['snippet']['title'],
                                Published_date = video['snippet']['publishedAt'],
                                Views = video['statistics']['viewCount'],
                                Likes = video['statistics']['likeCount'],
                                Comments = video['statistics']['commentCount']
                                )
                all_video_stats.append(video_stats)
        
        return all_video_stats

    video_details = get_video_details(youtube, video_ids)

    video_data = pd.DataFrame(video_details)

    video_data['Likes'] = pd.to_numeric(video_data['Likes'])
    video_data['Comments'] = pd.to_numeric(video_data['Comments'])

    top10_videos = video_data.drop(['Published_date','Title','Views'],axis=1)
    df2 = top10_videos.sum(axis=0)

    total_videos = len(top10_videos)
    likes,comments = df2[0],df2[1]
    total_subs  = int(channel_data['Subscribers'])
    channel_name = list(channel_data['Channel_name'])[0]
    channel_view = int(channel_data['Views'])
    profile_url =  list(channel_data['channel_profile_url'])[0]

    engagement_rate = (((likes+comments)/total_videos)/total_subs)*100
    engagement_rate = engagement_rate.round(2)

    # print(f"Channel Name: {channel_name}")
    # print(f"Channel View: {channel_view}")
    # print(f"Channel Subs: {total_subs}")
    # print(f"Engagement Rate: {engagement_rate}")
    # print(f"{profile_url}")

    final_dict={"Channel Name": channel_name,
                "Channel View": channel_view,
                "Channel Subs": total_subs,
                "Engagement Rate": engagement_rate,
                "Profile URL": profile_url,
                }
    return final_dict
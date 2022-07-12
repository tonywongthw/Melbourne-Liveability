
import json
import couchdb
import os
from shapely.geometry import Polygon
from shapely.geometry import Point
import re
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

# put huge data on the server and change the filepath
huge_data = 'data/raw_data.json'
suburbs_poly = 'data/housing_type.json'



# get classification of score
def polarity_score(compound):
   
    if compound == 0.0:
        return "neutral"
    elif compound < 0:
        return "negative"
    elif compound > 0:
        return "positive"

# initialize sentiment analyzer
sid = SentimentIntensityAnalyzer()
def preprocess_tweet(raw):
    # remove urls and links
    tweet = re.sub(r"http\S+|www\S+|https\S+|bit.ly/\S+'", '', raw, flags=re.MULTILINE)
    tweet = tweet.strip('[link]')
    tweet = re.sub(r'pic.twitter\S+','', tweet)

    # remove retweet, hashtags and @user
    tweet = re.sub(r"RT @[\w]*:", ' ', tweet, flags=re.MULTILINE)
    tweet = re.sub(r"#(\w+)", ' ', tweet, flags=re.MULTILINE)
    tweet = re.sub(r"@(\w+)", ' ', tweet, flags=re.MULTILINE)

    # remove multiple spaces
    tweet = re.sub("\s+"," ",tweet)

    scores = sid.polarity_scores(tweet)
    classify = polarity_score(scores['compound'])
    return classify,scores['compound']

# get suburbs from json housing file
def get_suburbs(json_file):
    # open json file
    read_json = json.load(open(json_file))

    # list comprehension to get suburbs 
    suburb_list = [x['properties']['sa2_name16'] for x in read_json['features']]

    return suburb_list, read_json


suburbs, boundary_file = get_suburbs(suburbs_poly)

SINGLE = 'Polygon'
MULTI = 'MultiPolygon'

# get suburb of tweet
def find_suburb(long, lat):
    # look through each suburb block
    for sub in boundary_file['features']:

        # if shape is a multipolygon go through each polygon
        if sub['geometry']['type'] == MULTI:
            for each in sub['geometry']['coordinates']:

                # if point is in polygon return suburb
                if Polygon(each[0]).contains(Point([long,lat])):
                    return sub['properties']['sa2_name16']

        # if shape is a single polygon
        elif sub['geometry']['type'] == SINGLE:

            # if point is in polygon return suburb
            if Polygon(sub['geometry']['coordinates'][0]).contains(Point([long,lat])):
                return sub['properties']['sa2_name16']
    return None

total_tweet = 0
processed_tweet = []

with open(huge_data) as f:
    
    
    data = json.load(f)
    
    for tweet in data:
        
        t = {}
        
        suburb = find_suburb(tweet['longitude'],tweet['latitude'])
        
        if suburb != None:
            sentiment = preprocess_tweet(tweet['text'])
            t['text'] = tweet['text']
            t['suburb'] = suburb
            t['sentiment'] = sentiment[0]
            t['score'] = sentiment[1]
            processed_tweet.append(t)
            # couch_database.save({'suburb': suburb, 'text': tweet['text'],'sentiment':sentiment[0],'score':sentiment[1]})
            
            total_tweet += 1
        # print(find_suburb(tweet['doc']['geo']['coordinates'][1],tweet['doc']['geo']['coordinates'][0]),tweet['doc']['text'],tweet['doc']['id'])
        
        
# initialize coucbdb

couch = couchdb.Server('http://admin:XlkLSNezrwOlQ0fIx5C6@172.26.128.201:30396/')
try:
    couch_database = couch.create('augment')
except:
    del couch['augment']
    couch_database = couch.create('augment')

for each in processed_tweet:
    couch_database.save({'suburb': each['suburb'], 'text': each['text'],'sentiment':each['sentiment'],'score':each['score']})
print(total_tweet)

import json
import tweepy
import couchdb
import os
from shapely.geometry import Polygon
from shapely.geometry import Point
import re
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer


credentials = os.path.join(os.path.dirname(os.path.abspath(__file__)), "credentials.json")
suburbs_poly = os.path.join(os.path.dirname(os.path.abspath(__file__)), "housing_type.json")

# initialize coucbdb
couch = couchdb.Server('http://admin:XlkLSNezrwOlQ0fIx5C6@172.26.128.201:30396/')
try:
    couch_database = couch.create('harvest')
except:
    couch_database = couch['harvest']


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


def get_credentials(credentials_file):
    read_json = json.load(open(credentials))
    stream = {}
    for cred in read_json['stream']:
        stream.update({cred: read_json['stream'][cred]})
    
    return stream
    
stream = get_credentials(credentials)

# authentication

def authentications():
    # authenticate stream
    auth = tweepy.OAuthHandler(stream['api_key'], stream['api_secret'])
    auth.set_access_token(stream['access_token'], stream['access_secret'])

    

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

# parse json tweet from stream and store in couchdb
def parse_tweet(tweet):
    suburb = None
    if tweet['coordinates'] != None:

        if type(tweet['coordinates']) is dict:

            suburb = find_suburb(tweet['coordinates']['coordinates'][0],tweet['coordinates']['coordinates'][1])

        else:

            suburb = find_suburb(tweet['coordinates'][0],tweet['coordinates'][1])

    else:
        try:
            if tweet['place']['place_type'] == 'city':
                suburb = tweet['place']['name']
        except:
            suburb = None
            pass
    # store in couchdb
    if suburb != None:
        sentiment = preprocess_tweet(tweet['text'])
        couch_database.save({'id': tweet['id'], 'suburb': suburb, 'text': tweet['text'], 'sentiment': sentiment[0], 'score': sentiment[1]})
        print("Tweet stored in CouchDB")
        # print(suburb,tweet['text'],tweet['id'])
        pass
  
# class for twitter stream
class MyStreamListener(tweepy.Stream):
    
    def on_data(self, data):
        
        try: 
            tweet = json.loads(data)
            print(tweet)
            if 'RT @' not in tweet['text']:
                parse_tweet(tweet)
                        
        except Exception:
            print("Failed to parse tweet")
            tweet = None

        

    def on_error(self, status_code):
        if status_code ==420:
            return False
        else:
            return True

MELBOURNE_BOUNDARY = [144.3336,-38.5030,145.8784,-37.1751]

def streamtweets():
    authentications()
    myStreamListener = MyStreamListener(stream['api_key'],stream['api_secret'],stream['access_token'],stream['access_secret'])
    myStreamListener.filter(languages =['en'], locations=MELBOURNE_BOUNDARY)

streamtweets()




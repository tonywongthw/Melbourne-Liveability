from pip import main
import requests
import os
import json
import time

# To set your environment variables in your terminal run the following line:
# export 'BEARER_TOKEN'='<your_bearer_token>'
#bearer_token = os.environ.get("BEARER_TOKEN")
bearer_token = 'ENTER YOUR TOKEN HERE'
search_url = "https://api.twitter.com/1.1/search/tweets.json"

#Setting to test the script and not waste queries
TESTING = True

# Helper Function definitions
def generate_query(keywords: list[str], ignore: list[str]):
    # Creates a query that searches for any keywords given around melbourne in a 25km radius for the past 7 days
    return {'q': f'({" OR ".join(keywords)}) {" ".join(["-"+i for i in ignore])} -is:retweet lang:en','geocode': ' -37.840935,144.946457,25km', 'count': str(10 if TESTING else 100) }

def bearer_oauth(r):
    """
    Method required by bearer token authentication.
    """

    r.headers["Authorization"] = f"Bearer {bearer_token}"
    r.headers["User-Agent"] = "v2RecentSearchPython"
    return r

def connect_to_endpoint(url, params):
    response = requests.get(url, auth=bearer_oauth, params=params)
    #print(response.status_code)
    if response.status_code != 200:
        raise Exception(response.status_code, response.text)
    return response.json()

# Driver Code

# Read search keywords and blacklisted words
# The location of where this can be changed
# depending on environment
keywords = ['covid', 'corona', 'virus']
# E.g:
# with open('keywords.txt') as file:
#    keywords = [line.rstrip() for line in file]

blacklist = ['beer']

# Get custom query
query_params = generate_query(keywords, blacklist)

# Request tweets from twitter api and store data

json_response = connect_to_endpoint(search_url, query_params)
with open("search_results2.json", 'a') as file:
    file.write('[')

    i = 0
    while(json_response):
        # Take data and store it
        # Edit here to change how it is stored
        json_str = json.dumps(json_response['statuses'], indent = 4)
        file.write(json_str.strip('[]'))

        ''' E.G. sample code to post to database
        for tweet in json_response['statuses']:
            res = requests.put('http://couchdb.url.here', tweet)
            if res.status_code != 201:
                raise Exception(res.status_code, res.text)
        '''
        if TESTING:
            if i == 3:
                break
        i += 1

        # Get next page of tweets
        next_url = json_response['search_metadata']["next_results"]
        if not next_url:
            break
        file.write(',') # Add a comma for the next page
        while True:
            try:
                json_response = connect_to_endpoint(search_url+next_url, None)
                break
            except:
                time.sleep(300) # wait if api is overloaded


    # Finally close json
    file.write(']')

    print('Wrote ' + str(i) + ' Pages')

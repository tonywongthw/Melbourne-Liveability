from turtle import setpos
from flask import Flask, render_template, jsonify
from flask_cors import CORS
import geopandas as gpd
import pandas as pd
import requests
import json
from asyncio.windows_events import NULL
import operator

app = Flask(__name__)
CORS(app)
'''
# load aurin data in the json file as a dataframe of properties, so that it can be merged to the shapefile properties
with open(".\static\SA2-G02_Selected_Medians_and_Averages-Census_2016.json\sa2_g02_selected_medians_and_averages_census_2016-7286388448228732680.json") as f:
    data = json.load(f)
ldf = list()
for item in data["features"]:
    ldf.append(item["properties"])
df = pd.DataFrame(ldf)

@app.route("/")
def hello_world():
    return ("Hello!")

# shapefile data
@app.route("/geopandas")
def geopandas():
    house_type = gpd.read_file(r"static\spatialise-rent\shp\sa2_p02_selected_medians_and_averages_census_2016-.shp")
    output = house_type.to_json()
    return output

# data with merged properties of aurin and shapefile
@app.route("/aurin")
def aurin():
    house_type = gpd.read_file(r"static\spatialise-rent\shp\sa2_p02_selected_medians_and_averages_census_2016-.shp")
    result = house_type.merge(df, on="sa2_main16")
    output = result.to_json()
    return output
'''
@app.route("/testGet2")
def testGet2():
    uri = "http://user:pass@172.26.132.238:5984/data/_design/data/_view/test?group=true"
    try:
        uResponse = requests.get(uri)
        Jresponse = uResponse.text
        data = json.loads(Jresponse)
        output = data
        print(type(output))
    except requests.ConnectionError:
       return "Connection Error"

    return output

# data sorted according to value, it takes a bit long to sort (about 30s on my computer)
@app.route("/testGet2/sorted")
def testGet2_top10positive():
    uri = "http://user:pass@172.26.132.238:5984/data/_design/data/_view/test?group=true"
    try:
        uResponse = requests.get(uri)
        Jresponse = uResponse.text
        data = json.loads(Jresponse)
        #output = data
        output = data
        output["rows"] = sorted(data["rows"], key = lambda item: item['value'], reverse = True)
    except requests.ConnectionError:
       return "Connection Error"
    
    return output

# get request to retrieve data from couchDB by looping through ip addresses
@app.route("/testGetTopic/<str1>")
def testGetTopic(str1):
    uri1 = "http://admin:XlkLSNezrwOlQ0fIx5C6@172.26.133.82:30396/" + str1 + "/_design/aggregate/_view/suburb?group=true"
    uri2 = "http://admin:XlkLSNezrwOlQ0fIx5C6@172.26.132.238:30396/" + str1 + "/_design/aggregate/_view/suburb?group=true"
    uri3 = "http://admin:XlkLSNezrwOlQ0fIx5C6@172.26.128.201:30396/" + str1 + "/_design/aggregate/_view/suburb?group=true"

    try:
        uResponse = requests.get(uri1)
        if "error" in uResponse.text:
            uResponse = requests.get(uri2)
        if "error" in uResponse.text:
            uResponse = requests.get(uri3)
        Jresponse = uResponse.text
        data = json.loads(Jresponse)
        data_in_pos_sentiments = process(data)
    except requests.ConnectionError:
       return "Connection Error"

    return data_in_pos_sentiments

# function to process the data to output list of suburb and % of positive sentiments
def process(data):
    dict = {}
    
    for i in data['rows']:
        suburb = i['key'][0]
        sentiment = i['key'][1]
        value = i['value']

        suburb_class = NULL
        if suburb in dict:
            suburb_class = dict[suburb]
        else:
            suburb_class = Suburb(suburb)
        
        if (sentiment == "negative"):
            suburb_class.negative += value
        elif (sentiment == "neutral"):
            suburb_class.neutral += value
        elif (sentiment == "positive"):
            suburb_class.positive += value
        
        dict[suburb] = suburb_class

    dict2 = {}
    for key, value in dict.items():
        value.positive_percent = round(value.positive/(value.negative + value.neutral + value.positive)*100,2)
        dict2[value.suburb] = value.positive_percent

    sorted_dict = sorted(dict2.items(), key=operator.itemgetter(1), reverse=True)

    json_object = json.dumps(sorted_dict, indent = 4) 
    print(json_object)

    return json_object

class Suburb:
    def __init__(self, name):
        self.suburb = name
        self.negative = 0
        self.neutral = 0
        self.positive = 0
        self.positive_percent = 0

if __name__ == '__main__':
    app.debug=True
    app.run()

'''
login page: http://172.26.132.238:5984/_utils/index.html#login
'''
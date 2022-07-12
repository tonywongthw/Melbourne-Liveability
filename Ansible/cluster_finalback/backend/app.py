from flask import Flask, render_template, jsonify
from flask_cors import CORS
import geopandas as gpd
import pandas as pd
import requests
import json
import os
import operator

app = Flask(__name__)
CORS(app)
housetypespath = os.path.join(os.path.dirname(os.path.abspath(__file__)),"static","spatialise-rent", "shp", r"sa2_p02_selected_medians_and_averages_census_2016-.shp")
censuspath = os.path.join(os.path.dirname(os.path.abspath(__file__)),"static","SA2-G02_Selected_Medians_and_Averages-Census_2016.json", "sa2_g02_selected_medians_and_averages_census_2016-7286388448228732680.json")


@app.route("/")
def hello():
    return ("Hello!")

# shapefile data
@app.route("/geopandas")
def geopandas():
    house_type = gpd.read_file(housetypespath)
    output = house_type.to_json()
    return output

@app.route("/testGet2")
def testGet2():
    uri = "http://user:pass@172.26.132.238:5984/data/_design/data/_view/test?group=true"
    try:
        uResponse = requests.get(uri)
        Jresponse = uResponse.text
        data = json.loads(Jresponse)
        output = data
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

        suburb_class = None
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
    
    # prepare DataFrame and geoDataFrame to merge
    dfoutput = pd.DataFrame({"feature_n2": dict2.keys(), "positive_percent": dict2.values()})
    house_type = gpd.read_file(housetypespath)
    house_type["centroid"] = house_type.centroid
    result = house_type.merge(dfoutput, on="feature_n2")
    result["geometry"] = result["centroid"]
    result = result.drop(columns=["centroid", "feature_c1", "median_re0"])
    result = result.sort_values(by=["positive_percent"], ascending=False)

    output = result.to_json()

    return output

    # used for no-centroid [[suburb, positive_percent]] output
    #sorted_dict = sorted(dict2.items(), key=operator.itemgetter(1), reverse=True)
    #print("sorted_dict")
    #print(sorted_dict)

    #json_object = json.dumps(sorted_dict, indent = 4) 
    #print(json_object)

    #return json_object

class Suburb:
    def __init__(self, name):
        self.suburb = name
        self.negative = 0
        self.neutral = 0
        self.positive = 0
        self.positive_percent = 0

@app.route("/aurin/<str>")
def aurin(str):
    with open(censuspath) as f:
        data = json.load(f)
    ldf = list()
    for item in data["features"]:
        ldf.append(item["properties"])
    df = pd.DataFrame(ldf)

    # both are geopandas.GeoDataFrame
    house_type = gpd.read_file(housetypespath)
    data = house_type.merge(df, on="sa2_main16")

    if (str == "geodata"):
        output = data.to_json()

    # all properties are pandas.DataFrame, and its output(orient="records") has form: [{column -> value}, … ]
    elif (str == "data"):
        properties = data.get(["feature_n2", "sa2_main16", "median_tot_hhd_inc_weekly", 
        "median_mortgage_repay_monthly", "median_rent_weekly", "median_tot_fam_inc_weekly", 
        "median_tot_prsnl_inc_weekly"])
        output = properties.to_json(orient="records")
    elif (str == "mortgage_sorted"):
        properties = data.get(["feature_n2", "sa2_main16", "median_mortgage_repay_monthly"])
        properties = properties.sort_values(by=["median_mortgage_repay_monthly"], ascending=False)
        output = properties.to_json(orient="records")
    elif (str == "rent_sorted"):
        properties = data.get(["feature_n2", "sa2_main16", "median_rent_weekly"])
        properties = properties.sort_values(by=["median_rent_weekly"], ascending=False)
        output = properties.to_json(orient="records")
    elif (str == "familyinc_sorted"):
        properties = data.get(["feature_n2", "sa2_main16", "median_tot_fam_inc_weekly"])
        properties = properties.sort_values(by=["median_tot_fam_inc_weekly"], ascending=False)
        output = properties.to_json(orient="records")
    elif (str == "householdinc_sorted"):
        properties = data.get(["feature_n2", "sa2_main16", "median_tot_hhd_inc_weekly"])
        properties = properties.sort_values(by=["median_tot_hhd_inc_weekly"], ascending=False)
        output = properties.to_json(orient="records")
    elif (str == "personalinc_sorted"):
        properties = data.get(["feature_n2", "sa2_main16", "median_tot_prsnl_inc_weekly"])
        properties = properties.sort_values(by=["median_tot_prsnl_inc_weekly"], ascending=False)
        output = properties.to_json(orient="records")
    return output

if __name__ == '__main__':
    app.debug=True
    app.run()

'''
login page: http://172.26.132.238:5984/_utils/index.html#login
'''

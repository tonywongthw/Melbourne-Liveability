from asyncio.windows_events import NULL
import json
import os
import operator

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

    #return data

class Suburb:
    def __init__(self, name):
        self.suburb = name
        self.negative = 0
        self.neutral = 0
        self.positive = 0
        self.positive_percent = 0

__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))
with open(os.path.join(__location__, 'test.json')) as json_file:
    data = json.load(json_file)

process(data)
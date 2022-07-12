from flask import Flask, jsonify
import requests
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

with open('.\static\smallfile.json') as f:
    data = json.load(f)
#print(data)

@app.route('/file', methods=['GET'])
def get_filedata():
    #response = jsonify({'name': 'Hello'})
    response = jsonify(data)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route("/")
def hello_world():
    return ("Hello!")

@app.route("/testGet")
def testGet():
    uri = "http://172.26.132.238:5984/"
    try:
        uResponse = requests.get(uri)
        Jresponse = uResponse.text
        data = json.loads(Jresponse)
        output = data
    except requests.ConnectionError:
       return "Connection Error"

    return output

@app.route("/testGetSpecific/<str>")
def testGetSpecific(str):
    uri = "http://172.26.128.201:30396/"
    try:
        uResponse = requests.get(uri)
        Jresponse = uResponse.text
        data = json.loads(Jresponse)
        output = data[str]
    except requests.ConnectionError:
       return "Connection Error"

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

@app.route("/testGetTopic/<str>")
def testGetTopic(str):
    uri = ""
    if (str == "crypto"):
        uri = "http://admin:XlkLSNezrwOlQ0fIx5C6@172.26.128.201:30396/crypto/_design/aggregate/_view/suburb?group=true"
    elif (str == "covid"):
        uri = "http://admin:XlkLSNezrwOlQ0fIx5C6@172.26.128.201:30396/covid/_design/aggregate/_view/suburb?group=true"
    elif (str == "housing"):
        uri = "http://admin:XlkLSNezrwOlQ0fIx5C6@172.26.128.201:30396/housing/_design/aggregate/_view/suburb?group=true"
    elif (str == "election"):
        uri = "http://admin:XlkLSNezrwOlQ0fIx5C6@172.26.128.201:30396/election/_design/aggregate/_view/suburb?group=true"
    elif (str == "harvest"):
        uri = "http://admin:XlkLSNezrwOlQ0fIx5C6@172.26.128.201:30396/harvest/_design/aggregate/_view/suburb?group=true"

    try:
        uResponse = requests.get(uri)
        Jresponse = uResponse.text
        data = json.loads(Jresponse)
        output = data
    except requests.ConnectionError:
       return "Connection Error"

    return output

if __name__ == '__main__':
    app.debug=True
    app.run()


'''
login page: http://172.26.132.238:5984/_utils/index.html#login
'''
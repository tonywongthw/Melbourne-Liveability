from flask import Flask, render_template, request, url_for, redirect
import folium
import requests
import json
import geopandas as gpd

app = Flask(__name__)

#testing geopandas

@app.route('/geopandas')
def geopandas():
    house_type = gpd.read_file(r"C:\Users\tony1\Documents\GitHub\COMP90024_A2\data\spatialise-rent\shp\sa2_p02_selected_medians_and_averages_census_2016-.shp")

    map = house_type.explore()
    folium.Marker(
        location=[-37.823364,144.95633],
        popup="<b>100</b>",
        tooltip="South Bank"
    ).add_to(map)

    map.save('templates/map.html')
    return render_template('Page1.html')

@app.route('/')
def index():
    map = folium.Map(
        location=[-37.840935,144.946457]
    )
    
    folium.Marker(
        location=[-37.823364,144.95633],
        popup="<b>100</b>",
        tooltip="South Bank"
    ).add_to(map)
    folium.Marker(
        location=[-37.81794,145.12369],
        popup="<b>80</b>",
        tooltip="Box Hill"
    ).add_to(map)

    folium.Marker(
        location=[-38.148991411100134, 144.35844532757642],
        popup="<b>50</b>",
        tooltip="Geelong"
    ).add_to(map)

    folium.Marker(
        location=[-37.912430478752995, 144.9905811928703],
        popup="<b>50</b>",
        tooltip="Brighton"
    ).add_to(map)
    
    map.save('templates/map.html')
    return render_template('Page1.html')

@app.route('/map')
def map():
    return render_template('map.html')

@app.route('/features')
def features():
    return render_template('Page2.html')

@app.route("/login",methods=["POST", "GET"])
def login():
    if request.method == "POST":
        user = request.form["nm"]
        return redirect(url_for("user", usr=user))
    else :
        return render_template("login.html")

@app.route("/<usr>")
def user(usr):
    return f"<h1>{usr}</hr>"

@app.route("/takeinput/<string>")
def takeinput(string):
    return f"<h1>{string}</hr>"

@app.route("/testGet/<str>")
def testGet(str):
    uri = "http://172.26.128.201:30396/"
    try:
        uResponse = requests.get(uri)
        Jresponse = uResponse.text
        data = json.loads(Jresponse)
        output = data[str]
    except requests.ConnectionError:
       return "Connection Error"

    return output

if __name__ == '__main__':
    app.run(debug=True)
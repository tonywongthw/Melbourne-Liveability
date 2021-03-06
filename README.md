# Melbourne Liveability
 :world_map: A web application visualising statistical data on an interactive map.

# Features

1. Visualising data such as weekly mortgage on heat map

![Feature1](https://j.gifs.com/z6Ej47.gif)

2. Showing the name of suburb when hovering mouse over a specific region, such as Brighton

![Feature2](https://j.gifs.com/Pj9DKl.gif)

3. Comparing data in bar chart, such as weekly rent vs weekly mortgage

![Feature3](https://j.gifs.com/Rl0GK0.gif)

# Demo

Full Demonstration is available in the following YouTube video link:

https://www.youtube.com/watch?v=06PgcuYHC_k

# Tech Stacks

Map Library: Leaflet

Backend : Flask

Frontend : React, NodeJS

Database : CouchDB

API : Twitter API

Deployment : Ansible

# Design Overview

1. Running ansible scripts to deploy the web application on cloud
3. Setup CouchDB as No-SQL database
3. Running twitter harvester to harvest relevant tweets to store in CouchDB
4. Setting up Backend server using flask
5. Running frontend with react

# Cloning for testing front-end and backend

The following steps will run the web applicatio on local host using cached data, without the need to deploy the application to cloud, running CouchDB or Twitter harvester.

Clone the Repository

Set Up Backend Flask Server
1. cd to "backend" folder
2. run "py app.py"

Set Up Front End under node environment:
1. cd to "frontend" folder
2. run "npm install"
3. run "npm start", then a web page will pop out

# Remarks
The following additional folders are also available for exploration

- Ansible : Scripts to set up kubernets and deploy the web application on cloud
- Twitter-harvester : Scripts to harvets tweets using Twitter API
- CouchDB : Scripts to set up a CouchDB database on cloud

Overlay features and some data are not included in public repository due to data privacy.

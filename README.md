# Melbourne Liveability
 A two tier web application for visualising statistical data on map

# Demo



# Features

1. Visualising data such as weekly mortgage on heat map



2. Showing the name of suburb when hovering mouse over a specific region, such as Brighton


3. Comparing data in bar chart, such as weekly rent vs weekly mortgage



# Design Overview

1. Running ansible scripts to deploy the web application on cloud
3. Setup CouchDB as No-SQL database
3. Running twitter harvester to harvest relevant tweets to store in CouchDB
4. Setting up Backend server using flask
5. Running frontend with react

# Cloning for testing front-end and backend

Clone the Repository

Set Up Backend Flask Server
1. cd to "backend" folder
2. run "py app.py"

Set Up Front End under node environment:
1. cd to "frontend" folder
2. run "npm install"
3. run "npm start", then a web page will pop out.

# Remarks
This repository also contains the following additional folders for exploration

- Ansible : Scripts to set up kubernets and deploy the web application on cloud
- Twitter-harvester : Scripts to harvets tweets using Twitter API
- CouchDB : Scripts to set up a CouchDB database on cloud

Overlay features and some data are not included in public repository due to data privacy.
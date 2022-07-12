This is a demo for backend(flask) and frontend(react) communication. Backend reads a static json file and returns a rest response. Frontend fetches to backend and gets the response then display it.

To run this communication, first run backend in one terminal, then when backend is ready, run frontend in another terminal:

0. setup frontend: cd to "frontend" folder, make sure it contains "package.json", run npm install.
1. run backend: cd to "backend" folder and run flask run. -> to see backend response, open a web page for port5000.
2. when backend's running, cd to "frontend" folder and run npm start. -> a web page for port3000 will pop out.
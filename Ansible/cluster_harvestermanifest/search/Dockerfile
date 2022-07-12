FROM ubuntu:20.04
FROM python:3.10-bullseye

RUN mkdir /app
WORKDIR /app
ADD . /app/
RUN apt-get update && apt-get install -y libgeos-dev
RUN pip install --no-cache-dir -r requirements.txt

CMD python3 search_tweet.py

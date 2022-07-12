
import couchdb


couch = couchdb.Server('http://admin:XlkLSNezrwOlQ0fIx5C6@172.26.128.201:30396/')

try:

    database = couch.create('test')
except:
    database = couch['test']





database.save({'id': 123, 'suburb': 'melbourne', 'text': 'hello'})
set -e


curl -X PUT http://admin:XlkLSNezrwOlQ0fIx5C6@172.26.128.201:30396/crypto/_design/aggregate -d '{"views":{"suburb":{"map": "function (doc) {if (doc.suburb !== null){emit ([doc.suburb,doc.sentiment],1);}}","reduce": "function(keys, values, rereduce) {return sum(values);}"}}}'

curl -X PUT http://admin:XlkLSNezrwOlQ0fIx5C6@172.26.128.201:30396/election/_design/aggregate -d '{"views":{"suburb":{"map": "function (doc) {if (doc.suburb !== null){emit ([doc.suburb,doc.sentiment],1);}}","reduce": "function(keys, values, rereduce) {return sum(values);}"}}}'

curl -X PUT http://admin:XlkLSNezrwOlQ0fIx5C6@172.26.128.201:30396/housing/_design/aggregate -d '{"views":{"suburb":{"map": "function (doc) {if (doc.suburb !== null){emit ([doc.suburb,doc.sentiment],1);}}","reduce": "function(keys, values, rereduce) {return sum(values);}"}}}'

curl -X PUT http://admin:XlkLSNezrwOlQ0fIx5C6@172.26.128.201:30396/covid/_design/aggregate -d '{"views":{"suburb":{"map": "function (doc) {if (doc.suburb !== null){emit ([doc.suburb,doc.sentiment],1);}}","reduce": "function(keys, values, rereduce) {return sum(values);}"}}}'

curl -X PUT http://admin:XlkLSNezrwOlQ0fIx5C6@172.26.128.201:30396/harvest/_design/aggregate -d '{"views":{"suburb":{"map": "function (doc) {if (doc.suburb !== null){emit ([doc.suburb,doc.sentiment],1);}}","reduce": "function(keys, values, rereduce) {return sum(values);}"}}}'

curl -X PUT http://admin:XlkLSNezrwOlQ0fIx5C6@172.26.128.201:30396/augment/_design/aggregate -d '{"views":{"suburb":{"map": "function (doc) {if (doc.suburb !== null){emit ([doc.suburb,doc.sentiment],1);}}","reduce": "function(keys, values, rereduce) {return sum(values);}"}}}'
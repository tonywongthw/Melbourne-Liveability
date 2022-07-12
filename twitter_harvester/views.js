{
    "_id":"_design/election",
    "_rev":"16-51fce18f4ce65b37a9b6ee43b55dea77",
    "views":{
        "suburb":{
            "map":"function (doc) {\n  if (doc.suburb !== null){\n    emit([doc.suburb,doc.sentiment],1);\n  }\n  \n}",
            "reduce":"function(value, counts) {\n  var sum = 0;\n  for(var i=0; i < counts.length; i++) {\n     sum += counts[i];\n  }\n  return value,sum;\n}"}},
            "language":"javascript"
}
    
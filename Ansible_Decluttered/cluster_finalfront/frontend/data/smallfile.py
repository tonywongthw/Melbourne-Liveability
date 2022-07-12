import json

with open('abs_data_by_region_pop_and_people_asgs_sa3_2011_2019.json') as f:
   data = json.load(f)

print(data.keys(), len(data["features"]), data["features"][0].keys())

# extract "sa3_name_2016", "sa3_code_2016", "yr", "population_density_as_at_30_june_population_density_personskm2"
l = list()
for element in data["features"]:
    #print(element["properties"]["sa3_name_2016"], element["properties"]["sa3_code_2016"], element["properties"]["yr"], 
    #element["properties"]["population_density_as_at_30_june_population_density_personskm2"])
    l.append({"sa3_name": element["properties"]["sa3_name_2016"], "sa3_code": element["properties"]["sa3_code_2016"], 
    "yr": element["properties"]["yr"], 
    "population_density": element["properties"]["population_density_as_at_30_june_population_density_personskm2"]})
print(l)
with open("smallfile.json", "w") as output_file:
    json.dump(l, output_file)
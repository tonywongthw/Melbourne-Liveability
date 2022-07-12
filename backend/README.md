A possible alternate endpoint of aurin if need barchart/top10 for aurin data:

@app.route("/aurin/<str>")
def aurin(str):
    with open(".\static\SA2-G02_Selected_Medians_and_Averages-Census_2016.json\sa2_g02_selected_medians_and_averages_census_2016-7286388448228732680.json") as f:
        data = json.load(f)
    ldf = list()
    for item in data["features"]:
        ldf.append(item["properties"])
    df = pd.DataFrame(ldf)

    # both are geopandas.GeoDataFrame
    house_type = gpd.read_file(r"static\spatialise-rent\shp\sa2_p02_selected_medians_and_averages_census_2016-.shp")
    data = house_type.merge(df, on="sa2_main16")

    if (str == "geodata"):
        output = data.to_json()
    # all properties are pandas.DataFrame, and its output(orient="records") has form: [{column -> value}, … ]
    elif (str == "data"):
        properties = data.get(["feature_n2", "sa2_main16", "median_tot_hhd_inc_weekly", 
        "median_mortgage_repay_monthly", "median_rent_weekly", "median_tot_fam_inc_weekly", 
        "median_tot_prsnl_inc_weekly"])
        output = properties.to_json(orient="records")
    elif (str == "mortgage_sorted"):
        properties = data.get(["feature_n2", "sa2_main16", "median_mortgage_repay_monthly"])
        properties = properties.sort_values(by=["median_mortgage_repay_monthly"], ascending=False)
        output = properties.to_json(orient="records")
    elif (str == "rent_sorted"):
        properties = data.get(["feature_n2", "sa2_main16", "median_rent_weekly"])
        properties = properties.sort_values(by=["median_rent_weekly"], ascending=False)
        output = properties.to_json(orient="records")
    elif (str == "familyinc_sorted"):
        properties = data.get(["feature_n2", "sa2_main16", "median_tot_fam_inc_weekly"])
        properties = properties.sort_values(by=["median_tot_fam_inc_weekly"], ascending=False)
        output = properties.to_json(orient="records")
    elif (str == "householdinc_sorted"):
        properties = data.get(["feature_n2", "sa2_main16", "median_tot_hhd_inc_weekly"])
        properties = properties.sort_values(by=["median_tot_hhd_inc_weekly"], ascending=False)
        output = properties.to_json(orient="records")
    elif (str == "personalinc_sorted"):
        properties = data.get(["feature_n2", "sa2_main16", "median_tot_prsnl_inc_weekly"])
        properties = properties.sort_values(by=["median_tot_prsnl_inc_weekly"], ascending=False)
        output = properties.to_json(orient="records")
    return output

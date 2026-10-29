import json
cases = [
    {
        'name': 'standard_world',
        'inserts': "INSERT INTO World VALUES ('Afghanistan', 'Asia', 652230, 25500100, 20343000000), ('Albania', 'Europe', 28748, 2831741, 12960000000), ('Algeria', 'Africa', 2381741, 37100000, 188681000000), ('Andorra', 'Europe', 468, 78115, 3712000000), ('Angola', 'Africa', 1246700, 20609294, 100990000000);"
    },
    {
        'name': 'no_big_countries',
        'inserts': "INSERT INTO World VALUES ('Tiny', 'Europe', 100, 1000, 100000);"
    }
]
print(json.dumps(cases))

import json

inserts = "INSERT INTO Wineries VALUES (103, 'Australia', 84, 'Whispering Breeze'), (737, 'Australia', 85, 'Sweet Ripe Winery'), (848, 'Australia', 100, 'Harmony Hill'), (222, 'Hungary', 60, 'Moonlit Cellars');"

print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))

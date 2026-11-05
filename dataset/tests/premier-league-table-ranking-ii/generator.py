import json

inserts = [
    "INSERT INTO TeamStats (team_id, team_name, matches_played, wins, draws, losses) VALUES (1, 'Manchester City', 10, 8, 1, 1);",
    "INSERT INTO TeamStats (team_id, team_name, matches_played, wins, draws, losses) VALUES (2, 'Liverpool', 10, 7, 2, 1);",
    "INSERT INTO TeamStats (team_id, team_name, matches_played, wins, draws, losses) VALUES (3, 'Arsenal', 10, 7, 2, 1);",
    "INSERT INTO TeamStats (team_id, team_name, matches_played, wins, draws, losses) VALUES (4, 'Chelsea', 10, 5, 2, 3);",
    "INSERT INTO TeamStats (team_id, team_name, matches_played, wins, draws, losses) VALUES (5, 'Tottenham', 10, 4, 3, 3);",
    "INSERT INTO TeamStats (team_id, team_name, matches_played, wins, draws, losses) VALUES (6, 'Everton', 10, 2, 1, 7);"
]

print(json.dumps([{"name": "case_1", "inserts": inserts}]))

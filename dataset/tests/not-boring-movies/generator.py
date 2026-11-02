import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO cinema (id, movie, description, rating) VALUES (1, 'War', 'great 3D', 8.9), (2, 'Science', 'fiction', 8.5), (3, 'irish', 'boring', 6.2), (4, 'Ice song', 'Fantacy', 8.6), (5, 'House card', 'Interesting', 9.1);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))

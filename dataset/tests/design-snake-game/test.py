import json

with open('dataset/problems/design-snake-game.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
SnakeGame = scope['SnakeGame']

sg = SnakeGame(3, 2, [[1, 2], [0, 1]])
assert sg.move("R") == 0
assert sg.move("D") == 0
assert sg.move("R") == 1
assert sg.move("U") == 1
assert sg.move("L") == 2
assert sg.move("U") == -1
print("Passed design-snake-game tests")

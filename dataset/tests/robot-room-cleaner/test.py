import json

class MockRobot:
    def __init__(self, room, r, c):
        self.room = room
        self.r = r
        self.c = c
        self.d = 0 # 0: U, 1: R, 2: D, 3: L
        self.cleaned = set()
        self.dirs = [(-1, 0), (0, 1), (1, 0), (0, -1)]

    def move(self):
        dr, dc = self.dirs[self.d]
        nr, nc = self.r + dr, self.c + dc
        if 0 <= nr < len(self.room) and 0 <= nc < len(self.room[0]) and self.room[nr][nc] == 1:
            self.r = nr
            self.c = nc
            return True
        return False

    def turnLeft(self):
        self.d = (self.d - 1) % 4

    def turnRight(self):
        self.d = (self.d + 1) % 4

    def clean(self):
        self.cleaned.add((self.r, self.c))

with open('dataset/problems/robot-room-cleaner.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
sol = scope['Solution']()

room = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
]
robot = MockRobot(room, 0, 0)
sol.cleanRoom(robot)
assert len(robot.cleaned) == 8
print("Passed robot-room-cleaner tests")

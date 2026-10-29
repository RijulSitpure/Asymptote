import json

class Reader4:
    def __init__(self, content):
        self.content = content
        self.ptr = 0

    def read4(self, buf4):
        count = 0
        while count < 4 and self.ptr < len(self.content):
            buf4[count] = self.content[self.ptr]
            count += 1
            self.ptr += 1
        return count

reader = Reader4("abcde")
def read4(buf4):
    return reader.read4(buf4)

with open('dataset/problems/read-n-characters-given-read4.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], {'read4': read4}, scope)
sol = scope['Solution']()
buf = [''] * 5
ans = sol.read(buf, 5)
assert ans == 5
assert "".join(buf[:ans]) == "abcde"
print("Passed read-n-characters-given-read4 tests")

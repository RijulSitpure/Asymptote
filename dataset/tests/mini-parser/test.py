import json

class NestedInteger:
    def __init__(self, val=None):
        if val is None:
            self._list = []
            self._int = None
        else:
            self._int = val
            self._list = None

    def isInteger(self):
        return self._int is not None

    def getInteger(self):
        return self._int

    def getList(self):
        return self._list

    def add(self, elem):
        if self._list is None:
            self._list = []
        self._list.append(elem)

with open('dataset/problems/mini-parser.json') as f:
    prob = json.load(f)

scope = {'NestedInteger': NestedInteger}
exec(prob['solutions'][0]['code'], scope)
sol = scope['Solution']()

res1 = sol.deserialize("324")
assert res1.isInteger() and res1.getInteger() == 324

res2 = sol.deserialize("[123,[456,[789]]]")
assert not res2.isInteger()
assert len(res2.getList()) == 2
print("Passed mini-parser tests")

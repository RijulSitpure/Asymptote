import json

class NestedInteger:
    def __init__(self, val=None):
        if val is None:
            self._list = []
            self._int = None
        elif isinstance(val, int):
            self._int = val
            self._list = None
        else:
            self._list = val
            self._int = None

    def isInteger(self):
        return self._int is not None

    def getInteger(self):
        return self._int

    def getList(self):
        return self._list

with open('dataset/problems/nested-list-weight-sum.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
sol = scope['Solution']()

# [[1,1], 2, [1,1]]
nested = [
    NestedInteger([NestedInteger(1), NestedInteger(1)]),
    NestedInteger(2),
    NestedInteger([NestedInteger(1), NestedInteger(1)])
]
assert sol.depthSum(nested) == 10
print("Passed nested-list-weight-sum tests")

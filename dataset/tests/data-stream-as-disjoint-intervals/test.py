import json

with open('dataset/problems/data-stream-as-disjoint-intervals.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
SummaryRanges = scope['SummaryRanges']

sr = SummaryRanges()
sr.addNum(1)
assert sr.getIntervals() == [[1, 1]]
sr.addNum(3)
assert sr.getIntervals() == [[1, 1], [3, 3]]
sr.addNum(7)
assert sr.getIntervals() == [[1, 1], [3, 3], [7, 7]]
sr.addNum(2)
assert sr.getIntervals() == [[1, 3], [7, 7]]
sr.addNum(6)
assert sr.getIntervals() == [[1, 3], [6, 7]]
print("Passed data-stream-as-disjoint-intervals tests")

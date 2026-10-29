import json

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

with open('dataset/problems/linked-list-random-node.json') as f:
    prob = json.load(f)

scope = {'Optional': None, 'ListNode': ListNode}
exec(prob['solutions'][0]['code'], scope)
Solution = scope['Solution']

head = ListNode(1, ListNode(2, ListNode(3)))
sol = Solution(head)
counts = {1: 0, 2: 0, 3: 0}
for _ in range(300):
    counts[sol.getRandom()] += 1
assert all(c > 0 for c in counts.values())
print("Passed linked-list-random-node tests")

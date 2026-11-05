from solution import Solution

class Node:
    def __init__(self, val, prev=None, next=None):
        self.val = val
        self.prev = prev
        self.next = next

def build_dll(vals):
    if not vals:
        return None
    head = Node(vals[0])
    curr = head
    for v in vals[1:]:
        node = Node(v, prev=curr)
        curr.next = node
        curr = node
    return head

sol = Solution()
assert sol.toArray(build_dll([1, 2, 3, 4, 5])) == [1, 2, 3, 4, 5]
assert sol.toArray(build_dll([4, 5, 6])) == [4, 5, 6]
assert sol.toArray(None) == []
print("All tests passed successfully.")

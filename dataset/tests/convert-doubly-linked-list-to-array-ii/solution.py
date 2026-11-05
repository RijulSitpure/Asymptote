# Definition for a _Node.
class Node:
    def __init__(self, val, prev=None, next=None):
        self.val = val
        self.prev = prev
        self.next = next

class Solution:
    def toArray(self, node: 'Node') -> list[int]:
        if not node:
            return []
        # Walk backwards to find head
        curr = node
        while curr.prev:
            curr = curr.prev
        # Walk forwards and collect values
        res = []
        while curr:
            res.append(curr.val)
            curr = curr.next
        return res

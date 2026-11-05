class Node:
    def __init__(self, val, prev=None, next=None):
        self.val = val
        self.prev = prev
        self.next = next
# Definition for a Node.
# class Node:
#     def __init__(self, val, prev=None, next=None):
#         self.val = val
#         self.prev = prev
#         self.next = next

class Solution:
    def toArray(self, head: 'Node') -> list[int]:
        res = []
        curr = head
        while curr:
            res.append(curr.val)
            curr = curr.next
        return res

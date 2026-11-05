from typing import Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def build_list(vals):
    dummy = ListNode()
    curr = dummy
    for v in vals:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next

def to_list(head):
    res = []
    while head:
        res.append(head.val)
        head = head.next
    return sorted(res)

from solution import Solution

s = Solution()
assert to_list(s.frequenciesOfElements(build_list([1, 1, 2, 1, 2, 3]))) == [1, 2, 3]
assert to_list(s.frequenciesOfElements(build_list([1, 1, 1, 1]))) == [4]
print("linked-list-frequency tests passed!")

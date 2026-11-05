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

from solution import Solution

s = Solution()
assert s.gameResult(build_list([2, 1])) == "Even"
assert s.gameResult(build_list([2, 5, 4, 7, 2, 1])) == "Odd"
assert s.gameResult(build_list([4, 5, 2, 1])) == "Tie"
print("winner-of-the-linked-list-game tests passed!")

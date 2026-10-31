from typing import Optional
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

from solution import Solution
s = Solution()
# 1 -> 5 -> 7 -> (back to 1)
n1, n2, n3 = ListNode(1), ListNode(5), ListNode(7)
n1.next = n2; n2.next = n3; n3.next = n1
r1, r2 = s.splitCircularLinkedList(n1)
assert r1.val == 1 and r1.next.val == 5 and r1.next.next == r1
assert r2.val == 7 and r2.next == r2
print('All tests passed for split-a-circular-linked-list!')

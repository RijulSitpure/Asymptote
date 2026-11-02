from typing import List, Optional
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
class Solution:
    def doubleIt(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if head and head.val >= 5:
            head = ListNode(0, head)
        curr = head
        while curr:
            carry = 1 if curr.next and curr.next.val >= 5 else 0
            curr.val = (curr.val * 2 + carry) % 10
            curr = curr.next
        return head

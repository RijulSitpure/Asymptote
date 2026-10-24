import sys
import heapq
from typing import List, Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        heap = []
        for i, node in enumerate(lists):
            if node:
                heapq.heappush(heap, (node.val, i, node))
        dummy = ListNode(0)
        curr = dummy
        while heap:
            val, i, node = heapq.heappop(heap)
            curr.next = node
            curr = curr.next
            if node.next:
                heapq.heappush(heap, (node.next.val, i, node.next))
        return dummy.next

def to_list(vals):
    dummy = ListNode(0)
    curr = dummy
    for v in vals:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next

def to_arr(node):
    res = []
    while node:
        res.append(node.val)
        node = node.next
    return res

def test():
    sol = Solution()
    l1 = to_list([1, 4, 5])
    l2 = to_list([1, 3, 4])
    l3 = to_list([2, 6])
    merged = sol.mergeKLists([l1, l2, l3])
    assert to_arr(merged) == [1, 1, 2, 3, 4, 4, 5, 6], "test 1 failed"
    assert sol.mergeKLists([]) is None, "test 2 failed"
    print("✓ merge-k-sorted-lists passed")

if __name__ == "__main__":
    test()

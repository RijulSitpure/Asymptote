from typing import Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def removeZeroSumSublists(self, head: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        prefix = 0
        seen = {}
        
        curr = dummy
        while curr:
            prefix += curr.val
            seen[prefix] = curr
            curr = curr.next
        
        prefix = 0
        curr = dummy
        while curr:
            prefix += curr.val
            curr.next = seen[prefix].next
            curr = curr.next
        
        return dummy.next

def to_list(node):
    res = []
    while node:
        res.append(node.val)
        node = node.next
    return res

def from_list(arr):
    dummy = ListNode()
    curr = dummy
    for x in arr:
        curr.next = ListNode(x)
        curr = curr.next
    return dummy.next

def test():
    sol = Solution()
    h1 = from_list([1,2,-3,3,1])
    assert to_list(sol.removeZeroSumSublists(h1)) == [3,1], "test 1 failed"
    h2 = from_list([1,2,3,-3,4])
    assert to_list(sol.removeZeroSumSublists(h2)) == [1,2,4], "test 2 failed"
    print("✓ remove-zero-sum-consecutive-nodes-from-linked-list passed")

if __name__ == "__main__":
    test()

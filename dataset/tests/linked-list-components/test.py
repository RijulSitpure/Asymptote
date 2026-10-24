from typing import List, Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def numComponents(self, head: Optional[ListNode], nums: List[int]) -> int:
        num_set = set(nums)
        cur = head
        ans = 0
        while cur:
            if cur.val in num_set and (cur.next is None or cur.next.val not in num_set):
                ans += 1
            cur = cur.next
        return ans

def build_list(vals):
    dummy = ListNode(0)
    cur = dummy
    for v in vals:
        cur.next = ListNode(v)
        cur = cur.next
    return dummy.next

def test():
    sol = Solution()
    l1 = build_list([0, 1, 2, 3])
    assert sol.numComponents(l1, [0, 1, 3]) == 2, "test 1 failed"
    l2 = build_list([0, 1, 2, 3, 4])
    assert sol.numComponents(l2, [0, 3, 1, 4]) == 2, "test 2 failed"
    print("✓ linked-list-components passed")

if __name__ == "__main__":
    test()

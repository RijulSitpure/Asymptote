from typing import Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def plusOne(self, head: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        not_nine = dummy
        curr = head
        while curr:
            if curr.val != 9:
                not_nine = curr
            curr = curr.next

        not_nine.val += 1
        curr = not_nine.next
        while curr:
            curr.val = 0
            curr = curr.next

        return dummy if dummy.val != 0 else dummy.next

def to_list(head):
    res = []
    curr = head
    while curr:
        res.append(curr.val)
        curr = curr.next
    return res

def from_list(lst):
    dummy = ListNode(0)
    curr = dummy
    for x in lst:
        curr.next = ListNode(x)
        curr = curr.next
    return dummy.next

def test():
    sol = Solution()
    t1 = sol.plusOne(from_list([1,2,3]))
    assert to_list(t1) == [1,2,4], "test 1 failed"
    t2 = sol.plusOne(from_list([0]))
    assert to_list(t2) == [1], "test 2 failed"
    t3 = sol.plusOne(from_list([9]))
    assert to_list(t3) == [1,0], "test 3 failed"
    print("✓ plus-one-linked-list passed")

if __name__ == "__main__":
    test()

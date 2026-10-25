class Solution:
    def mergeInBetween(self, list1, a: int, b: int, list2):
        curr = list1
        for _ in range(a - 1):
            curr = curr.next
        node_before_a = curr
        for _ in range(b - a + 2):
            curr = curr.next
        node_after_b = curr

        node_before_a.next = list2
        tail2 = list2
        while tail2.next:
            tail2 = tail2.next
        tail2.next = node_after_b
        return list1

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def to_list(head):
    res = []
    while head:
        res.append(head.val)
        head = head.next
    return res

def from_list(vals):
    dummy = ListNode(0)
    curr = dummy
    for v in vals:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next

def test():
    sol = Solution()
    l1 = from_list([10,1,13,6,9,5])
    l2 = from_list([1000000,1000001,1000002])
    res = sol.mergeInBetween(l1, 3, 4, l2)
    assert to_list(res) == [10,1,13,1000000,1000001,1000002,5]

    print("✓ merge-in-between-linked-lists passed")

if __name__ == '__main__':
    test()

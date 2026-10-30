class Solution:
    def deleteDuplicatesUnsorted(self, head: ListNode) -> ListNode:
        counts = {}
        curr = head
        while curr:
            counts[curr.val] = counts.get(curr.val, 0) + 1
            curr = curr.next

        dummy = ListNode(0)
        tail = dummy
        curr = head
        while curr:
            if counts[curr.val] == 1:
                tail.next = curr
                tail = tail.next
            curr = curr.next
        tail.next = None
        return dummy.next

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
    tail = dummy
    for v in vals:
        tail.next = ListNode(v)
        tail = tail.next
    return dummy.next

def test_delete_duplicates():
    sol = Solution()
    head = from_list([1, 2, 3, 2])
    res = sol.deleteDuplicatesUnsorted(head)
    assert to_list(res) == [1, 3]


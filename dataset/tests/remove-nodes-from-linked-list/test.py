from solution import Solution
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
head = ListNode(5, ListNode(2, ListNode(13, ListNode(3, ListNode(8)))))
s = Solution()
assert to_list(s.removeNodes(head)) == [13, 8]
print('All tests passed for remove-nodes-from-linked-list!')

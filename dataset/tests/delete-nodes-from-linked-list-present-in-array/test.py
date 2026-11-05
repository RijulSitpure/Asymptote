from solution import Solution

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def build_list(vals):
    dummy = ListNode(0)
    curr = dummy
    for v in vals:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next

def to_list(head):
    res = []
    curr = head
    while curr:
        res.append(curr.val)
        curr = curr.next
    return res

sol = Solution()
head = build_list([1, 2, 3, 4, 5])
ans = sol.modifiedList([1, 2, 3], head)
assert to_list(ans) == [4, 5]

head = build_list([1, 2, 1, 2, 1, 2])
ans = sol.modifiedList([1], head)
assert to_list(ans) == [2, 2, 2]

head = build_list([1, 2, 3, 4])
ans = sol.modifiedList([5], head)
assert to_list(ans) == [1, 2, 3, 4]
print("All tests passed successfully.")

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def to_list(arr):
    dummy = ListNode(0)
    curr = dummy
    for x in arr:
        curr.next = ListNode(x)
        curr = curr.next
    return dummy.next

def to_arr(head):
    res = []
    while head:
        res.append(head.val)
        head = head.next
    return res

class Solution:
    def deleteNodes(self, head: ListNode, m: int, n: int) -> ListNode:
        curr = head
        while curr:
            for _ in range(m - 1):
                if not curr: return head
                curr = curr.next
            if not curr or not curr.next: return head
            nxt = curr.next
            for _ in range(n):
                if not nxt: break
                nxt = nxt.next
            curr.next = nxt
            curr = nxt
        return head

sol = Solution()
l1 = to_list([1,2,3,4,5,6,7,8,9,10,11,12,13])
assert to_arr(sol.deleteNodes(l1, 2, 3)) == [1,2,6,7,11,12]
l2 = to_list([1,2,3,4,5,6,7,8,9,10,11])
assert to_arr(sol.deleteNodes(l2, 1, 3)) == [1,5,9]
print("All tests passed successfully.")

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeNodes(self, head):
        dummy = ListNode(0)
        tail = dummy
        curr = head.next
        cur_sum = 0
        while curr:
            if curr.val == 0:
                tail.next = ListNode(cur_sum)
                tail = tail.next
                cur_sum = 0
            else:
                cur_sum += curr.val
            curr = curr.next
        return dummy.next

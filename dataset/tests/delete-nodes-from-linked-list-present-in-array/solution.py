class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def modifiedList(self, nums: list[int], head: ListNode) -> ListNode:
        remove_set = set(nums)
        dummy = ListNode(0, head)
        curr = dummy
        while curr.next:
            if curr.next.val in remove_set:
                curr.next = curr.next.next
            else:
                curr = curr.next
        return dummy.next

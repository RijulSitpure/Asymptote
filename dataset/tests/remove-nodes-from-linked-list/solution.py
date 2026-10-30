class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def removeNodes(self, head):
        stack = []
        curr = head
        while curr:
            while stack and stack[-1].val < curr.val:
                stack.pop()
            stack.append(curr)
            curr = curr.next
        dummy = ListNode(0)
        tail = dummy
        for node in stack:
            tail.next = node
            tail = node
        tail.next = None
        return dummy.next

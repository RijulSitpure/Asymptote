class Solution:
    def sortLinkedList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head
        prev = head
        curr = head.next
        while curr:
            if curr.val < 0:
                prev.next = curr.next
                curr.next = head
                head = curr
                curr = prev.next
            else:
                prev = curr
                curr = curr.next
        return head

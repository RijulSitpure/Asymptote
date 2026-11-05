class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def frequenciesOfElements(self, head: Optional[ListNode]) -> Optional[ListNode]:
        freq = {}
        curr = head
        while curr:
            freq[curr.val] = freq.get(curr.val, 0) + 1
            curr = curr.next
        dummy = ListNode(0)
        tail = dummy
        for count in freq.values():
            tail.next = ListNode(count)
            tail = tail.next
        return dummy.next

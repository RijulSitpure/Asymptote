class Solution:
    def gameResult(self, head: Optional[ListNode]) -> str:
        even_score = 0
        odd_score = 0
        curr = head
        while curr:
            if curr.val > curr.next.val:
                even_score += 1
            elif curr.next.val > curr.val:
                odd_score += 1
            curr = curr.next.next
        if even_score > odd_score:
            return 'Even'
        if odd_score > even_score:
            return 'Odd'
        return 'Tie'

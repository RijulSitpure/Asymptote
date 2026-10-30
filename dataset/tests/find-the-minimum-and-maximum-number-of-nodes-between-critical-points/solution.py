class Solution:
    def nodesBetweenCriticalPoints(self, head: Optional[ListNode]) -> list[int]:
        if not head or not head.next or not head.next.next:
            return [-1, -1]

        prev = head
        curr = head.next
        idx = 1
        first_cp = -1
        last_cp = -1
        prev_cp = -1
        min_dist = float('inf')

        while curr and curr.next:
            if (curr.val > prev.val and curr.val > curr.next.val) or \
               (curr.val < prev.val and curr.val < curr.next.val):
                if first_cp == -1:
                    first_cp = idx
                if prev_cp != -1:
                    min_dist = min(min_dist, idx - prev_cp)
                prev_cp = idx
                last_cp = idx
            prev = curr
            curr = curr.next
            idx += 1

        if first_cp == last_cp or first_cp == -1:
            return [-1, -1]
        return [min_dist, last_cp - first_cp]

class Solution:
    def reverseEvenLengthGroups(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev_group_tail = None
        curr = head
        group_len = 1

        while curr:
            count = 0
            temp = curr
            while temp and count < group_len:
                count += 1
                temp = temp.next

            if count % 2 == 0:
                rev_prev = None
                rev_curr = curr
                for _ in range(count):
                    nxt = rev_curr.next
                    rev_curr.next = rev_prev
                    rev_prev = rev_curr
                    rev_curr = nxt

                if prev_group_tail:
                    prev_group_tail.next = rev_prev
                curr.next = rev_curr
                prev_group_tail = curr
                curr = rev_curr
            else:
                for _ in range(count):
                    prev_group_tail = curr
                    curr = curr.next

            group_len += 1

        return head

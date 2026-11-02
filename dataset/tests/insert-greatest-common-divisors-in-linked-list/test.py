from solution import Solution, ListNode
s = Solution()
h = ListNode(18, ListNode(6, ListNode(10, ListNode(3))))
res = s.insertGreatestCommonDivisors(h)
vals = []
while res:
    vals.append(res.val)
    res = res.next
assert vals == [18, 6, 6, 2, 10, 1, 3]
print("insert-greatest-common-divisors-in-linked-list passed")

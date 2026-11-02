from solution import Solution, ListNode
s = Solution()
h = ListNode(1, ListNode(8, ListNode(9)))
res = s.doubleIt(h)
vals = []
while res:
    vals.append(res.val)
    res = res.next
assert vals == [3, 7, 8]
h2 = ListNode(9, ListNode(9, ListNode(9)))
res2 = s.doubleIt(h2)
vals2 = []
while res2:
    vals2.append(res2.val)
    res2 = res2.next
assert vals2 == [1, 9, 9, 8]
print("double-a-number-represented-as-a-linked-list passed")

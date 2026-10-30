from solution import Solution, ListNode

def make_list(arr):
    dummy = ListNode()
    curr = dummy
    for x in arr:
        curr.next = ListNode(x)
        curr = curr.next
    return dummy.next

s = Solution()
assert s.pairSum(make_list([5, 4, 2, 1])) == 6
assert s.pairSum(make_list([4, 2, 2, 3])) == 7
assert s.pairSum(make_list([1, 100000])) == 100001
print("All tests passed for maximum-twin-sum-of-a-linked-list!")

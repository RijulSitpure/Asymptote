from solution import Solution, ListNode

def make_list(arr):
    dummy = ListNode(0)
    curr = dummy
    for x in arr:
        curr.next = ListNode(x)
        curr = curr.next
    return dummy.next

def list_to_arr(head):
    res = []
    while head:
        res.append(head.val)
        head = head.next
    return res

s = Solution()
assert list_to_arr(s.mergeNodes(make_list([0,3,1,0,4,5,2,0]))) == [4, 11]
assert list_to_arr(s.mergeNodes(make_list([0,1,0,3,0,2,2,0]))) == [1, 3, 4]
print("All tests passed for merge-nodes-in-between-zeros!")

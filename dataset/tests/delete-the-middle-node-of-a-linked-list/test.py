from solution import Solution, ListNode

def to_list(head):
    res = []
    while head:
        res.append(head.val)
        head = head.next
    return res

def from_list(vals):
    dummy = ListNode(0)
    cur = dummy
    for v in vals:
        cur.next = ListNode(v)
        cur = cur.next
    return dummy.next

def run_tests():
    s = Solution()
    h1 = from_list([1, 3, 4, 7, 1, 2, 6])
    assert to_list(s.deleteMiddle(h1)) == [1, 3, 4, 1, 2, 6]

    h2 = from_list([1, 2, 3, 4])
    assert to_list(s.deleteMiddle(h2)) == [1, 2, 4]

    h3 = from_list([2, 1])
    assert to_list(s.deleteMiddle(h3)) == [2]

    h4 = from_list([1])
    assert s.deleteMiddle(h4) is None
    print("All tests passed for delete-the-middle-node-of-a-linked-list!")

if __name__ == '__main__':
    run_tests()

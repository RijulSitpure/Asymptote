from solution import Solution

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def to_list(head):
    res = []
    while head:
        res.append(head.val)
        head = head.next
    return res

def from_list(vals):
    dummy = ListNode(0)
    curr = dummy
    for v in vals:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next

def run_tests():
    s = Solution()
    h1 = from_list([5, 2, 6, 3, 9, 1, 7, 3, 8, 4])
    assert to_list(s.reverseEvenLengthGroups(h1)) == [5, 6, 2, 3, 9, 1, 4, 8, 3, 7]
    h2 = from_list([1, 1, 0, 6])
    assert to_list(s.reverseEvenLengthGroups(h2)) == [1, 0, 1, 6]
    print("All tests passed for reverse-nodes-in-even-length-groups!")

if __name__ == "__main__":
    run_tests()

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
    h1 = from_list([0, 2, -5, 5, 10, -10])
    assert to_list(s.sortLinkedList(h1)) == [-10, -5, 0, 2, 5, 10]
    h2 = from_list([0, 1, 2])
    assert to_list(s.sortLinkedList(h2)) == [0, 1, 2]
    h3 = from_list([1])
    assert to_list(s.sortLinkedList(h3)) == [1]
    print("All tests passed for sort-linked-list-already-sorted-using-absolute-values!")

if __name__ == "__main__":
    run_tests()

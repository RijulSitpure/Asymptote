from solution import Solution

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def from_list(vals):
    dummy = ListNode(0)
    curr = dummy
    for v in vals:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next

def run_tests():
    s = Solution()
    assert s.nodesBetweenCriticalPoints(from_list([3, 1])) == [-1, -1]
    assert s.nodesBetweenCriticalPoints(from_list([5, 3, 1, 2, 5, 1, 2])) == [1, 3]
    assert s.nodesBetweenCriticalPoints(from_list([1, 3, 2, 2, 3, 2, 2, 2, 7])) == [3, 3]
    print("All tests passed for find-the-minimum-and-maximum-number-of-nodes-between-critical-points!")

if __name__ == "__main__":
    run_tests()

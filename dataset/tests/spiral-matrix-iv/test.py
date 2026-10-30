from solution import Solution
s = Solution()
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def build_list(arr):
    dummy = ListNode()
    cur = dummy
    for x in arr:
        cur.next = ListNode(x)
        cur = cur.next
    return dummy.next

head1 = build_list([3,0,2,6,8,1,7,9,4,2,5,5,0])
assert s.spiralMatrix(3, 5, head1) == [[3,0,2,6,8],[5,0,-1,-1,1],[5,2,4,9,7]]
head2 = build_list([0,1,2])
assert s.spiralMatrix(1, 4, head2) == [[0,1,2,-1]]
print("All tests passed for spiral-matrix-iv!")

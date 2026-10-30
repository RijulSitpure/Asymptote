class PolyNode:
    def __init__(self, x=0, y=0, next=None):
        self.coefficient = x
        self.power = y
        self.next = next

class Solution:
    def addPoly(self, poly1: 'PolyNode', poly2: 'PolyNode') -> 'PolyNode':
        dummy = PolyNode()
        curr = dummy
        p1, p2 = poly1, poly2
        while p1 and p2:
            if p1.power > p2.power:
                curr.next = PolyNode(p1.coefficient, p1.power)
                curr = curr.next
                p1 = p1.next
            elif p2.power > p1.power:
                curr.next = PolyNode(p2.coefficient, p2.power)
                curr = curr.next
                p2 = p2.next
            else:
                sum_coef = p1.coefficient + p2.coefficient
                if sum_coef != 0:
                    curr.next = PolyNode(sum_coef, p1.power)
                    curr = curr.next
                p1 = p1.next
                p2 = p2.next
        while p1:
            curr.next = PolyNode(p1.coefficient, p1.power)
            curr = curr.next
            p1 = p1.next
        while p2:
            curr.next = PolyNode(p2.coefficient, p2.power)
            curr = curr.next
            p2 = p2.next
        return dummy.next

def to_list(head):
    res = []
    while head:
        res.append([head.coefficient, head.power])
        head = head.next
    return res

def from_list(pairs):
    dummy = PolyNode()
    curr = dummy
    for c, p in pairs:
        curr.next = PolyNode(c, p)
        curr = curr.next
    return dummy.next

sol = Solution()
p1 = from_list([[1,1]])
p2 = from_list([[1,0]])
assert to_list(sol.addPoly(p1, p2)) == [[1,1], [1,0]]

p3 = from_list([[2,2],[4,1],[3,0]])
p4 = from_list([[3,2],[-4,1],[-1,0]])
assert to_list(sol.addPoly(p3, p4)) == [[5,2], [2,0]]
print("All tests passed successfully.")

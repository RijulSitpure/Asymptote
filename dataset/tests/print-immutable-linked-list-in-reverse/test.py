class MockNode:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next
    def printValue(self):
        output.append(self.val)
    def getNext(self):
        return self.next

class Solution:
    def printLinkedListInReverse(self, head: 'MockNode') -> None:
        if not head:
            return
        self.printLinkedListInReverse(head.getNext())
        head.printValue()

output = []
n3 = MockNode(3)
n2 = MockNode(2, n3)
n1 = MockNode(1, n2)
sol = Solution()
sol.printLinkedListInReverse(n1)
assert output == [3, 2, 1]
print("All tests passed successfully.")

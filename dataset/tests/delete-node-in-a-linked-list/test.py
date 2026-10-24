import sys

class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    def deleteNode(self, node: ListNode) -> None:
        node.val = node.next.val
        node.next = node.next.next

def test():
    sol = Solution()
    # 4 -> 5 -> 1 -> 9
    head = ListNode(4)
    n5 = ListNode(5)
    n1 = ListNode(1)
    n9 = ListNode(9)
    head.next = n5
    n5.next = n1
    n1.next = n9

    sol.deleteNode(n5)
    vals = []
    curr = head
    while curr:
        vals.append(curr.val)
        curr = curr.next
    assert vals == [4, 1, 9], "test 1 failed"
    print("✓ delete-node-in-a-linked-list passed")

if __name__ == "__main__":
    test()

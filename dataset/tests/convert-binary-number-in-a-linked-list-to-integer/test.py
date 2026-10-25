class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def makeLinkedList(arr):
    dummy = ListNode(0)
    cur = dummy
    for x in arr:
        cur.next = ListNode(x)
        cur = cur.next
    return dummy.next

class Solution:
    def getDecimalValue(self, head) -> int:
        ans = 0
        cur = head
        while cur:
            ans = (ans << 1) | cur.val
            cur = cur.next
        return ans

def test():
    sol = Solution()
    assert sol.getDecimalValue(makeLinkedList([1,0,1])) == 5, "test 1 failed"
    assert sol.getDecimalValue(makeLinkedList([0])) == 0, "test 2 failed"
    print("✓ convert-binary-number-in-a-linked-list-to-integer passed")

if __name__ == "__main__":
    test()

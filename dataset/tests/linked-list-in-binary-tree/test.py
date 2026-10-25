from collections import deque

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def makeList(arr):
    dummy = ListNode(0)
    cur = dummy
    for x in arr:
        cur.next = ListNode(x)
        cur = cur.next
    return dummy.next

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def makeTree(arr):
    if not arr or arr[0] is None:
        return None
    root = TreeNode(arr[0])
    q = deque([root])
    i = 1
    while q and i < len(arr):
        curr = q.popleft()
        if i < len(arr) and arr[i] is not None:
            curr.left = TreeNode(arr[i])
            q.append(curr.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            curr.right = TreeNode(arr[i])
            q.append(curr.right)
        i += 1
    return root

class Solution:
    def isSubPath(self, head, root) -> bool:
        def match(list_node, tree_node):
            if not list_node:
                return True
            if not tree_node:
                return False
            if list_node.val != tree_node.val:
                return False
            return match(list_node.next, tree_node.left) or match(list_node.next, tree_node.right)
        if not root:
            return False
        return match(head, root) or self.isSubPath(head, root.left) or self.isSubPath(head, root.right)

def test():
    sol = Solution()
    assert sol.isSubPath(makeList([4,2,8]), makeTree([1,4,4,None,2,2,None,1,None,6,8,None,None,None,None,1,3])) == True, "test 1 failed"
    assert sol.isSubPath(makeList([1,4,2,6]), makeTree([1,4,4,None,2,2,None,1,None,6,8,None,None,None,None,1,3])) == True, "test 2 failed"
    assert sol.isSubPath(makeList([1,4,2,6,8]), makeTree([1,4,4,None,2,2,None,1,None,6,8,None,None,None,None,1,3])) == False, "test 3 failed"
    print("✓ linked-list-in-binary-tree passed")

if __name__ == "__main__":
    test()

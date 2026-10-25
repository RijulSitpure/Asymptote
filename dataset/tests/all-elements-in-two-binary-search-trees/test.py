from collections import deque

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
    def getAllElements(self, root1, root2) -> list[int]:
        def inorder(node, out):
            if not node:
                return
            inorder(node.left, out)
            out.append(node.val)
            inorder(node.right, out)
        l1, l2 = [], []
        inorder(root1, l1)
        inorder(root2, l2)
        i, j = 0, 0
        res = []
        while i < len(l1) and j < len(l2):
            if l1[i] <= l2[j]:
                res.append(l1[i])
                i += 1
            else:
                res.append(l2[j])
                j += 1
        res.extend(l1[i:])
        res.extend(l2[j:])
        return res

def test():
    sol = Solution()
    assert sol.getAllElements(makeTree([2,1,4]), makeTree([1,0,3])) == [0,1,1,2,3,4], "test 1 failed"
    assert sol.getAllElements(makeTree([1,None,8]), makeTree([8,1])) == [1,1,8,8], "test 2 failed"
    print("✓ all-elements-in-two-binary-search-trees passed")

if __name__ == "__main__":
    test()

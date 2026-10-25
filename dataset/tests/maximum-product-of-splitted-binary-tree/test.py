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
    def maxProduct(self, root) -> int:
        subtree_sums = []
        def get_sum(node):
            if not node:
                return 0
            s = node.val + get_sum(node.left) + get_sum(node.right)
            subtree_sums.append(s)
            return s
        total = get_sum(root)
        best = max(s * (total - s) for s in subtree_sums)
        return best % (10**9 + 7)

def test():
    sol = Solution()
    assert sol.maxProduct(makeTree([1,2,3,4,5,6])) == 110, "test 1 failed"
    assert sol.maxProduct(makeTree([1,None,2,3,4,None,None,5,6])) == 90, "test 2 failed"
    print("✓ maximum-product-of-splitted-binary-tree passed")

if __name__ == "__main__":
    test()

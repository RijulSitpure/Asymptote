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
    def goodNodes(self, root) -> int:
        def dfs(node, max_val):
            if not node:
                return 0
            is_good = 1 if node.val >= max_val else 0
            new_max = max(max_val, node.val)
            return is_good + dfs(node.left, new_max) + dfs(node.right, new_max)
        return dfs(root, root.val)

def test():
    sol = Solution()
    assert sol.goodNodes(makeTree([3,1,4,3,None,1,5])) == 4, "test 1 failed"
    assert sol.goodNodes(makeTree([3,3,None,4,2])) == 3, "test 2 failed"
    assert sol.goodNodes(makeTree([1])) == 1, "test 3 failed"
    print("✓ count-good-nodes-in-binary-tree passed")

if __name__ == "__main__":
    test()

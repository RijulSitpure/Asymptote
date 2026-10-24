from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def recoverFromPreorder(self, traversal: str) -> Optional[TreeNode]:
        stack = []
        i = 0
        n = len(traversal)
        while i < n:
            depth = 0
            while i < n and traversal[i] == '-':
                depth += 1
                i += 1
            val = 0
            while i < n and traversal[i].isdigit():
                val = val * 10 + int(traversal[i])
                i += 1
            node = TreeNode(val)
            while len(stack) > depth:
                stack.pop()
            if stack:
                if not stack[-1].left:
                    stack[-1].left = node
                else:
                    stack[-1].right = node
            stack.append(node)
        return stack[0]

def test():
    sol = Solution()
    root = sol.recoverFromPreorder("1-2--3--4-5--6--7")
    assert root.val == 1, "test root failed"
    assert root.left.val == 2, "test left failed"
    assert root.right.val == 5, "test right failed"
    print("✓ recover-a-tree-from-preorder-traversal passed")

if __name__ == "__main__":
    test()

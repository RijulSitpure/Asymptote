from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def getDirections(self, root: Optional[TreeNode], startValue: int, destValue: int) -> str:
        def find_path(node: Optional[TreeNode], target: int, path: list[str]) -> bool:
            if not node:
                return False
            if node.val == target:
                return True
            path.append('L')
            if find_path(node.left, target, path):
                return True
            path.pop()

            path.append('R')
            if find_path(node.right, target, path):
                return True
            path.pop()

            return False

        start_path: list[str] = []
        dest_path: list[str] = []

        find_path(root, startValue, start_path)
        find_path(root, destValue, dest_path)

        i = 0
        min_len = min(len(start_path), len(dest_path))
        while i < min_len and start_path[i] == dest_path[i]:
            i += 1

        up_steps = 'U' * (len(start_path) - i)
        down_steps = ''.join(dest_path[i:])

        return up_steps + down_steps

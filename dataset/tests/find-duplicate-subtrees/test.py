from typing import Optional, List

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def findDuplicateSubtrees(self, root: Optional[TreeNode]) -> List[Optional[TreeNode]]:
        counts = {}
        duplicates = []

        def serialize(node: Optional[TreeNode]) -> str:
            if not node:
                return "#"
            serial = f"{node.val},{serialize(node.left)},{serialize(node.right)}"
            counts[serial] = counts.get(serial, 0) + 1
            if counts[serial] == 2:
                duplicates.append(node)
            return serial

        serialize(root)
        return duplicates

def build_tree(lst):
    if not lst:
        return None
    root = TreeNode(lst[0])
    q = [root]
    i = 1
    while q and i < len(lst):
        node = q.pop(0)
        if i < len(lst) and lst[i] is not None:
            node.left = TreeNode(lst[i])
            q.append(node.left)
        i += 1
        if i < len(lst) and lst[i] is not None:
            node.right = TreeNode(lst[i])
            q.append(node.right)
        i += 1
    return root

def test():
    sol = Solution()
    t1 = build_tree([1,2,3,4,None,2,4,None,None,4])
    res1 = sol.findDuplicateSubtrees(t1)
    vals1 = sorted([node.val for node in res1])
    assert vals1 == [2, 4], "test 1 failed"
    print("✓ find-duplicate-subtrees passed")

if __name__ == "__main__":
    test()

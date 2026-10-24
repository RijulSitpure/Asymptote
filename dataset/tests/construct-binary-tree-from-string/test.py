from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def str2tree(self, s: str) -> Optional[TreeNode]:
        if not s:
            return None
        first_paren = s.find("(")
        if first_paren == -1:
            return TreeNode(int(s))

        root = TreeNode(int(s[:first_paren]))
        start = first_paren
        balance = 0
        for i in range(first_paren, len(s)):
            if s[i] == "(":
                balance += 1
            elif s[i] == ")":
                balance -= 1
            if balance == 0:
                if root.left is None:
                    root.left = self.str2tree(s[start + 1 : i])
                    start = i + 1
                else:
                    root.right = self.str2tree(s[start + 1 : i])
        return root

def tree_to_list(root):
    if not root:
        return []
    res = []
    q = [root]
    while q:
        curr = q.pop(0)
        if curr:
            res.append(curr.val)
            q.append(curr.left)
            q.append(curr.right)
        else:
            res.append(None)
    while res and res[-1] is None:
        res.pop()
    return res

def test():
    sol = Solution()
    t1 = sol.str2tree("4(2(3)(1))(6(5))")
    assert tree_to_list(t1) == [4,2,6,3,1,5], "test 1 failed"
    t2 = sol.str2tree("4(2(3)(1))(6(5)(7))")
    assert tree_to_list(t2) == [4,2,6,3,1,5,7], "test 2 failed"
    assert sol.str2tree("") is None, "test 3 failed"
    print("✓ construct-binary-tree-from-string passed")

if __name__ == "__main__":
    test()

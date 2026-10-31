from typing import Optional
class RopeTreeNode:
    def __init__(self, len=0, val='', left=None, right=None):
        self.len = len
        self.val = val
        self.left = left
        self.right = right

from solution import Solution
s = Solution()
r = RopeTreeNode(len=10, left=RopeTreeNode(len=0, val='myte'), right=RopeTreeNode(len=0, val='asympt'))
assert s.getKthCharacter(r, 1) == 'm'
assert s.getKthCharacter(r, 4) == 'e'
assert s.getKthCharacter(r, 5) == 'a'
assert s.getKthCharacter(r, 10) == 't'
print('All tests passed for extract-kth-character-from-the-rope-tree!')

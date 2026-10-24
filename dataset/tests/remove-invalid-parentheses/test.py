import sys
from typing import List
from collections import deque

class Solution:
    def removeInvalidParentheses(self, s: str) -> List[str]:
        def is_valid(sub: str) -> bool:
            bal = 0
            for ch in sub:
                if ch == "(": bal += 1
                elif ch == ")":
                    bal -= 1
                    if bal < 0: return False
            return bal == 0

        res = []
        visited = {s}
        q = deque([s])
        found = False

        while q:
            curr = q.popleft()
            if is_valid(curr):
                res.append(curr)
                found = True
            if found:
                continue
            for i in range(len(curr)):
                if curr[i] in "()":
                    nxt = curr[:i] + curr[i + 1:]
                    if nxt not in visited:
                        visited.add(nxt)
                        q.append(nxt)

        return res

def test():
    sol = Solution()
    r1 = sol.removeInvalidParentheses("()())()")
    assert sorted(r1) == sorted(["(())()", "()()()"]), "test 1 failed"
    r2 = sol.removeInvalidParentheses("(a)())()")
    assert sorted(r2) == sorted(["(a())()", "(a)()()"]), "test 2 failed"
    print("✓ remove-invalid-parentheses passed")

if __name__ == "__main__":
    test()

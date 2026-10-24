import sys
from typing import List

class Solution:
    def addOperators(self, num: str, target: int) -> List[str]:
        res = []
        n = len(num)

        def backtrack(idx: int, path: str, total: int, prev: int):
            if idx == n:
                if total == target:
                    res.append(path)
                return
            for i in range(idx, n):
                if i > idx and num[idx] == "0":
                    break
                part = num[idx:i + 1]
                val = int(part)
                if idx == 0:
                    backtrack(i + 1, part, val, val)
                else:
                    backtrack(i + 1, path + "+" + part, total + val, val)
                    backtrack(i + 1, path + "-" + part, total - val, -val)
                    backtrack(i + 1, path + "*" + part, total - prev + prev * val, prev * val)

        backtrack(0, "", 0, 0)
        return res

def test():
    sol = Solution()
    r1 = sol.addOperators("123", 6)
    assert sorted(r1) == sorted(["1*2*3", "1+2+3"]), "test 1 failed"
    r2 = sol.addOperators("232", 8)
    assert sorted(r2) == sorted(["2*3+2", "2+3*2"]), "test 2 failed"
    print("✓ expression-add-operators passed")

if __name__ == "__main__":
    test()

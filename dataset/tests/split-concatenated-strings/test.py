import sys
from typing import List

class Solution:
    def splitLoopedString(self, strs: List[str]) -> str:
        s_arr = [max(s, s[::-1]) for s in strs]
        best = ""
        n = len(strs)

        for i in range(n):
            mid = "".join(s_arr[i + 1:] + s_arr[:i])
            for cur in (strs[i], strs[i][::-1]):
                for j in range(len(cur)):
                    cand = cur[j:] + mid + cur[:j]
                    if cand > best:
                        best = cand

        return best

def test():
    sol = Solution()
    assert sol.splitLoopedString(["lc", "love", "ydc"]) == "ylclovecd", "test 1 failed"
    assert sol.splitLoopedString(["abc"]) == "cba", "test 2 failed"
    print("✓ split-concatenated-strings passed")

if __name__ == "__main__":
    test()

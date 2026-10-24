from typing import List
from collections import Counter

class Solution:
    def wordSubsets(self, words1: List[str], words2: List[str]) -> List[str]:
        b_max = Counter()
        for b in words2:
            for c, cnt in Counter(b).items():
                b_max[c] = max(b_max[c], cnt)

        ans = []
        for a in words1:
            c_a = Counter(a)
            if all(c_a[c] >= b_max[c] for c in b_max):
                ans.append(a)
        return ans

def test():
    sol = Solution()
    res1 = sol.wordSubsets(["amazon", "apple", "facebook", "google", "leetcode"], ["e", "o"])
    assert res1 == ["facebook", "google", "leetcode"], f"test 1 failed: {res1}"
    res2 = sol.wordSubsets(["amazon", "apple", "facebook", "google", "leetcode"], ["l", "e"])
    assert res2 == ["apple", "google", "leetcode"], f"test 2 failed: {res2}"
    print("✓ word-subsets passed")

if __name__ == "__main__":
    test()

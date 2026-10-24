import bisect
from collections import defaultdict
from typing import List

class Solution:
    def numMatchingSubseq(self, s: str, words: List[str]) -> int:
        pos = defaultdict(list)
        for i, ch in enumerate(s):
            pos[ch].append(i)

        ans = 0
        memo = {}
        for word in words:
            if word in memo:
                if memo[word]:
                    ans += 1
                continue

            idx = -1
            match = True
            for ch in word:
                lst = pos[ch]
                it = bisect.bisect_right(lst, idx)
                if it == len(lst):
                    match = False
                    break
                idx = lst[it]

            memo[word] = match
            if match:
                ans += 1

        return ans

def test():
    sol = Solution()
    assert sol.numMatchingSubseq("abcde", ["a", "bb", "acd", "ace"]) == 3, "test 1 failed"
    assert sol.numMatchingSubseq("dsahjpjauf", ["ahjpjau", "ja", "ahbwzgqnuk", "tnmlanowax"]) == 2, "test 2 failed"
    print("✓ number-of-matching-subsequences passed")

if __name__ == "__main__":
    test()

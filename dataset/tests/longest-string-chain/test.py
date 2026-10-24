from typing import List

class Solution:
    def longestStrChain(self, words: List[str]) -> int:
        words.sort(key=len)
        dp = {}
        res = 1
        for word in words:
            best = 1
            for i in range(len(word)):
                prev = word[:i] + word[i+1:]
                if prev in dp:
                    best = max(best, dp[prev] + 1)
            dp[word] = best
            res = max(res, best)
        return res

def test():
    sol = Solution()
    w1 = ["a","b","ba","bca","bda","bdca"]
    assert sol.longestStrChain(w1) == 4, "test 1 failed"
    w2 = ["xbc","pcxbcf","xb","cxbc","pcxbc"]
    assert sol.longestStrChain(w2) == 5, "test 2 failed"
    print("✓ longest-string-chain passed")

if __name__ == "__main__":
    test()

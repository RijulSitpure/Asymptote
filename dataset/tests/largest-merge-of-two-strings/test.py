class Solution:
    def largestMerge(self, word1: str, word2: str) -> str:
        i, j = 0, 0
        n, m = len(word1), len(word2)
        res = []
        while i < n and j < m:
            if word1[i:] >= word2[j:]:
                res.append(word1[i])
                i += 1
            else:
                res.append(word2[j])
                j += 1
        res.append(word1[i:])
        res.append(word2[j:])
        return "".join(res)

def test():
    sol = Solution()
    assert sol.largestMerge("cabaa", "bcaaa") == "cbcabaaaaa"
    assert sol.largestMerge("abcabc", "abdcaba") == "abdcabcabcaba"

    print("✓ largest-merge-of-two-strings passed")

if __name__ == '__main__':
    test()

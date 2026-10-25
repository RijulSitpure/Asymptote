class Solution:
    def mergeAlternately(self, word1: str, word2: str) -> str:
        res = []
        n, m = len(word1), len(word2)
        for i in range(max(n, m)):
            if i < n:
                res.append(word1[i])
            if i < m:
                res.append(word2[i])
        return "".join(res)

def test():
    sol = Solution()
    assert sol.mergeAlternately("abc", "pqr") == "apbqcr"
    assert sol.mergeAlternately("ab", "pqrs") == "apbqrs"
    assert sol.mergeAlternately("abcd", "pq") == "apbqcd"

    print("✓ merge-strings-alternately passed")

if __name__ == '__main__':
    test()

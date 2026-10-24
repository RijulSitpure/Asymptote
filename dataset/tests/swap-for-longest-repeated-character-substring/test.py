from collections import Counter

class Solution:
    def maxRepOpt1(self, text: str) -> int:
        counts = Counter(text)
        groups = []
        i = 0
        n = len(text)
        while i < n:
            j = i
            while j < n and text[j] == text[i]:
                j += 1
            groups.append((text[i], j - i))
            i = j
        
        res = 0
        for i, (ch, length) in enumerate(groups):
            res = max(res, min(length + 1, counts[ch]))
            if i + 2 < len(groups) and groups[i + 2][0] == ch and groups[i + 1][1] == 1:
                combined = length + groups[i + 2][1]
                res = max(res, min(combined + 1, counts[ch]))
        return res

def test():
    sol = Solution()
    assert sol.maxRepOpt1("ababa") == 3, "test 1 failed"
    assert sol.maxRepOpt1("aaabaaa") == 6, "test 2 failed"
    assert sol.maxRepOpt1("aaaaa") == 5, "test 3 failed"
    print("✓ swap-for-longest-repeated-character-substring passed")

if __name__ == "__main__":
    test()

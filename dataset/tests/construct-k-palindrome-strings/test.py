from collections import Counter

class Solution:
    def canConstruct(self, s: str, k: int) -> bool:
        if k > len(s):
            return False
        counts = Counter(s)
        odd_count = sum(1 for count in counts.values() if count % 2 == 1)
        return odd_count <= k

def test():
    sol = Solution()
    assert sol.canConstruct("annabelle", 2) == True, "test 1 failed"
    assert sol.canConstruct("leetcode", 3) == False, "test 2 failed"
    assert sol.canConstruct("true", 4) == True, "test 3 failed"
    print("✓ construct-k-palindrome-strings passed")

if __name__ == "__main__":
    test()

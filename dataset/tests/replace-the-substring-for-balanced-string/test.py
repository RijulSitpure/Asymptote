from collections import Counter

class Solution:
    def balancedString(self, s: str) -> int:
        count = Counter(s)
        n = len(s)
        k = n // 4
        if all(count[c] <= k for c in 'QWER'):
            return 0
            
        ans = n
        left = 0
        for right in range(n):
            count[s[right]] -= 1
            while all(count[c] <= k for c in 'QWER'):
                ans = min(ans, right - left + 1)
                count[s[left]] += 1
                left += 1
        return ans

def test():
    sol = Solution()
    assert sol.balancedString("QWER") == 0, "test 1 failed"
    assert sol.balancedString("QQWE") == 1, "test 2 failed"
    assert sol.balancedString("QQQW") == 2, "test 3 failed"
    print("✓ replace-the-substring-for-balanced-string passed")

if __name__ == "__main__":
    test()

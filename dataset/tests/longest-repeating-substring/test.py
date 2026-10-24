class Solution:
    def longestRepeatingSubstring(self, s: str) -> int:
        n = len(s)
        low, high = 1, n - 1
        res = 0

        def has_dup(length: int) -> bool:
            seen = set()
            for i in range(n - length + 1):
                sub = s[i:i + length]
                if sub in seen:
                    return True
                seen.add(sub)
            return False

        while low <= high:
            mid = (low + high) // 2
            if has_dup(mid):
                res = mid
                low = mid + 1
            else:
                high = mid - 1
        return res

def test():
    sol = Solution()
    assert sol.longestRepeatingSubstring("abcd") == 0, "test 1 failed"
    assert sol.longestRepeatingSubstring("abbaba") == 2, "test 2 failed"
    assert sol.longestRepeatingSubstring("aabcaabdaab") == 3, "test 3 failed"
    print("✓ longest-repeating-substring passed")

if __name__ == "__main__":
    test()

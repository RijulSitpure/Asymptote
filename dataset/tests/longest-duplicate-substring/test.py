class Solution:
    def longestDupSubstring(self, s: str) -> str:
        n = len(s)
        nums = [ord(c) - ord('a') for c in s]
        mod = (1 << 61) - 1

        def search(L: int) -> int:
            h = 0
            base_L = pow(26, L, mod)
            for i in range(L):
                h = (h * 26 + nums[i]) % mod
            seen = {h}
            for start in range(1, n - L + 1):
                h = (h * 26 - nums[start - 1] * base_L + nums[start + L - 1]) % mod
                if h in seen:
                    return start
                seen.add(h)
            return -1

        low, high = 1, n - 1
        best_start = -1
        best_len = 0
        while low <= high:
            mid = (low + high) // 2
            start = search(mid)
            if start != -1:
                best_start = start
                best_len = mid
                low = mid + 1
            else:
                high = mid - 1

        return s[best_start:best_start + best_len] if best_len > 0 else ""

def test():
    sol = Solution()
    assert sol.longestDupSubstring("banana") == "ana", "test 1 failed"
    assert sol.longestDupSubstring("abcd") == "", "test 2 failed"
    print("✓ longest-duplicate-substring passed")

if __name__ == "__main__":
    test()

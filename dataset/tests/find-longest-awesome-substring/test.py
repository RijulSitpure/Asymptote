class Solution:
    def longestAwesome(self, s: str) -> int:
        seen = {0: -1}
        mask = 0
        ans = 0
        for i, ch in enumerate(s):
            mask ^= (1 << int(ch))
            if mask in seen:
                ans = max(ans, i - seen[mask])
            for d in range(10):
                target_mask = mask ^ (1 << d)
                if target_mask in seen:
                    ans = max(ans, i - seen[target_mask])
            if mask not in seen:
                seen[mask] = i
        return ans

def test():
    sol = Solution()
    assert sol.longestAwesome("3242415") == 5, "test 1 failed"
    assert sol.longestAwesome("12345678") == 1, "test 2 failed"
    assert sol.longestAwesome("213123") == 6, "test 3 failed"
    print("✓ find-longest-awesome-substring passed")

if __name__ == "__main__":
    test()

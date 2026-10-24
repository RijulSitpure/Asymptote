class Solution:
    def longestWPI(self, hours: list[int]) -> int:
        score = 0
        max_len = 0
        seen = {}
        for i, h in enumerate(hours):
            score += 1 if h > 8 else -1
            if score > 0:
                max_len = i + 1
            else:
                if score not in seen:
                    seen[score] = i
                if (score - 1) in seen:
                    max_len = max(max_len, i - seen[score - 1])
        return max_len

def test():
    sol = Solution()
    assert sol.longestWPI([9,9,6,0,6,6,9]) == 3, "test 1 failed"
    assert sol.longestWPI([6,6,6]) == 0, "test 2 failed"
    print("✓ longest-well-performing-interval passed")

if __name__ == "__main__":
    test()

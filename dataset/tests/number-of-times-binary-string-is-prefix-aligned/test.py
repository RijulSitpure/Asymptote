class Solution:
    def numTimesAllBlue(self, flips: list[int]) -> int:
        max_idx = 0
        count = 0
        for i, val in enumerate(flips, 1):
            max_idx = max(max_idx, val)
            if max_idx == i:
                count += 1
        return count

def test():
    sol = Solution()
    assert sol.numTimesAllBlue([3,2,4,1,5]) == 2, "test 1 failed"
    assert sol.numTimesAllBlue([4,1,2,3]) == 1, "test 2 failed"
    print("✓ number-of-times-binary-string-is-prefix-aligned passed")

if __name__ == "__main__":
    test()

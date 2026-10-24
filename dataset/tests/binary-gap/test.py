class Solution:
    def binaryGap(self, n: int) -> int:
        last_idx = -1
        max_gap = 0
        idx = 0
        while n > 0:
            if n & 1:
                if last_idx != -1:
                    max_gap = max(max_gap, idx - last_idx)
                last_idx = idx
            n >>= 1
            idx += 1
        return max_gap

def test():
    sol = Solution()
    assert sol.binaryGap(22) == 2, "test 1 failed"
    assert sol.binaryGap(8) == 0, "test 2 failed"
    assert sol.binaryGap(5) == 2, "test 3 failed"
    print("✓ binary-gap passed")

if __name__ == "__main__":
    test()

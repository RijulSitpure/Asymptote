class Solution:
    def minFlipsMonoIncr(self, s: str) -> int:
        flips = 0
        ones = 0
        for ch in s:
            if ch == '1':
                ones += 1
            else:
                flips = min(flips + 1, ones)
        return flips

def test():
    sol = Solution()
    assert sol.minFlipsMonoIncr("00110") == 1, "test 1 failed"
    assert sol.minFlipsMonoIncr("010110") == 2, "test 2 failed"
    assert sol.minFlipsMonoIncr("00011000") == 2, "test 3 failed"
    print("✓ flip-string-to-monotone-increasing passed")

if __name__ == "__main__":
    test()

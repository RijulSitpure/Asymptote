class Solution:
    def minFlips(self, target: str) -> int:
        cur_state = "0"
        flips = 0
        for ch in target:
            if ch != cur_state:
                flips += 1
                cur_state = ch
        return flips

def test():
    sol = Solution()
    assert sol.minFlips("10111") == 3, "test 1 failed"
    assert sol.minFlips("101") == 3, "test 2 failed"
    assert sol.minFlips("00000") == 0, "test 3 failed"
    print("✓ minimum-suffix-flips passed")

if __name__ == "__main__":
    test()

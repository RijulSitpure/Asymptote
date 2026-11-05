class Solution:
    def minCuttingCost(self, n: int, m: int, k: int) -> int:
        x = max(n, m)
        return 0 if x <= k else k * (x - k)

def run_tests():
    s = Solution()
    res = s.minCuttingCost(4, 3, 2)
    assert res == 4, f"Expected 4, got {res}"
    print("3560 find-minimum-log-transportation-cost PASSED")

if __name__ == "__main__":
    run_tests()

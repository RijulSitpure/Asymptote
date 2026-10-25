class Solution:
    def findBestValue(self, arr: list[int], target: int) -> int:
        lo, hi = 0, max(arr)
        def get_sum(val):
            return sum(min(x, val) for x in arr)
        while lo < hi:
            mid = (lo + hi) // 2
            if get_sum(mid) < target:
                lo = mid + 1
            else:
                hi = mid
        s1 = get_sum(lo)
        s2 = get_sum(lo - 1)
        if abs(s2 - target) <= abs(s1 - target):
            return lo - 1
        return lo

def test():
    sol = Solution()
    assert sol.findBestValue([4,9,3], 10) == 3, "test 1 failed"
    assert sol.findBestValue([2,3,5], 10) == 5, "test 2 failed"
    assert sol.findBestValue([60864,25176,27249,21296,20204], 56803) == 11361, "test 3 failed"
    print("✓ sum-of-mutated-array-closest-to-target passed")

if __name__ == "__main__":
    test()

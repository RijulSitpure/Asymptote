class Solution:
    def closestToTarget(self, arr: list[int], target: int) -> int:
        cur_set = set()
        ans = float("inf")
        for x in arr:
            cur_set = {v & x for v in cur_set} | {x}
            for v in cur_set:
                ans = min(ans, abs(v - target))
        return ans

def test():
    sol = Solution()
    assert sol.closestToTarget([9,12,3,7,15], 5) == 2, "test 1 failed"
    assert sol.closestToTarget([1000000,1000000,1000000], 1) == 999999, "test 2 failed"
    assert sol.closestToTarget([1,2,4,8,16], 0) == 0, "test 3 failed"
    print("✓ find-a-value-of-a-mysterious-function-closest-to-target passed")

if __name__ == "__main__":
    test()

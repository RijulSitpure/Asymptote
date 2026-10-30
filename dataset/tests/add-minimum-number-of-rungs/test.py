class Solution:
    def addRungs(self, rungs: list[int], dist: int) -> int:
        curr = 0
        ans = 0
        for r in rungs:
            diff = r - curr
            if diff > dist:
                ans += (diff - 1) // dist
            curr = r
        return ans

def test_add_rungs():
    sol = Solution()
    assert sol.addRungs([1, 3, 5, 10], 2) == 2
    assert sol.addRungs([3, 6, 8, 10], 3) == 0
    assert sol.addRungs([3, 4, 6, 7], 2) == 1


class Solution:
    def getLastMoment(self, n: int, left: list[int], right: list[int]) -> int:
        ans = 0
        for p in left:
            ans = max(ans, p)
        for p in right:
            ans = max(ans, n - p)
        return ans

def test():
    sol = Solution()
    assert sol.getLastMoment(4, [4,3], [0,1]) == 4, "test 1 failed"
    assert sol.getLastMoment(7, [], [0,1,2,3,4,5,6,7]) == 7, "test 2 failed"
    assert sol.getLastMoment(7, [0,1,2,3,4,5,6,7], []) == 7, "test 3 failed"
    print("✓ last-moment-before-all-ants-fall-out-of-a-plank passed")

if __name__ == "__main__":
    test()

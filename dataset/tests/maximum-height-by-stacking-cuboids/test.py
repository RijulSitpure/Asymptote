class Solution:
    def maxHeight(self, cuboids: list[list[int]]) -> int:
        for c in cuboids:
            c.sort()
        cuboids.sort()
        n = len(cuboids)
        dp = [c[2] for c in cuboids]
        for i in range(n):
            for j in range(i):
                if cuboids[j][0] <= cuboids[i][0] and cuboids[j][1] <= cuboids[i][1] and cuboids[j][2] <= cuboids[i][2]:
                    dp[i] = max(dp[i], dp[j] + cuboids[i][2])
        return max(dp)

def test():
    sol = Solution()
    assert sol.maxHeight([[50,45,20],[95,37,53],[45,23,12]]) == 190
    assert sol.maxHeight([[38,25,45],[76,35,3]]) == 76
    assert sol.maxHeight([[7,11,17],[7,17,11],[11,7,17],[11,17,7],[17,7,11],[17,11,7]]) == 102

    print("✓ maximum-height-by-stacking-cuboids passed")

if __name__ == '__main__':
    test()

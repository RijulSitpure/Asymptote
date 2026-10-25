class Solution:
    def boxDelivering(self, boxes: list[list[int]], portsCount: int, maxBoxes: int, maxWeight: int) -> int:
        n = len(boxes)
        dp = [0] * (n + 1)
        j = 0
        weight = 0
        trips = 2
        for i in range(n):
            weight += boxes[i][1]
            if i > 0 and boxes[i][0] != boxes[i - 1][0]:
                trips += 1
            while i - j >= maxBoxes or weight > maxWeight or (j < i and dp[j] == dp[j + 1]):
                weight -= boxes[j][1]
                if boxes[j][0] != boxes[j + 1][0]:
                    trips -= 1
                j += 1
            dp[i + 1] = dp[j] + trips
        return dp[n]

def test():
    sol = Solution()
    assert sol.boxDelivering([[1,1],[2,1],[1,1]], 2, 3, 3) == 4
    assert sol.boxDelivering([[1,2],[3,3],[3,1],[3,1],[2,4]], 3, 3, 6) == 6
    assert sol.boxDelivering([[1,4],[1,2],[2,1],[2,1],[3,2],[3,4]], 3, 6, 7) == 6

    print("✓ delivering-boxes-from-storage-to-ports passed")

if __name__ == '__main__':
    test()

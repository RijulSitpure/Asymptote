class Solution:
    def minimumTotalDistance(self, robot: list[int], factory: list[list[int]]) -> int:
        robot.sort()
        factory.sort(key=lambda x: x[0])
        slots = []
        for pos, cap in factory:
            slots.extend([pos] * cap)
        n, m = len(robot), len(slots)
        dp = [float('inf')] * (m + 1)
        dp[0] = 0
        prev = [0] * (m + 1)
        for i in range(1, n + 1):
            cur = [float('inf')] * (m + 1)
            for j in range(i, m + 1):
                cur[j] = min(cur[j - 1], prev[j - 1] + abs(robot[i - 1] - slots[j - 1]))
            prev = cur
        return prev[m]

class Solution:
    def maxUpgradableServers(self, count: list[int], upgrade: list[int], sell: list[int], money: list[int]) -> list[int]:
        ans = []
        for c, u, s, m in zip(count, upgrade, sell, money):
            k = (m + c * s) // (u + s)
            ans.append(min(c, k))
        return ans

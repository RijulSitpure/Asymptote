class Solution:
    def sumDistance(self, nums: list[int], s: str, d: int) -> int:
        MOD = 10**9 + 7
        n = len(nums)
        pos = []
        for i in range(n):
            delta = d if s[i] == 'R' else -d
            pos.append(nums[i] + delta)
        pos.sort()
        total = 0
        for i in range(n):
            term = pos[i] * (2 * i - n + 1)
            total = (total + term) % MOD
        return (total % MOD + MOD) % MOD

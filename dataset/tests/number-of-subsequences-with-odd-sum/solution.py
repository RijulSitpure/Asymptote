class Solution:
    def subsequenceCount(self, nums: list[int]) -> int:
        mod = 10**9 + 7
        f = [0, 0]
        for x in nums:
            if x % 2 == 1:
                f[0], f[1] = (f[0] + f[1]) % mod, (f[0] + f[1] + 1) % mod
            else:
                f[0], f[1] = (f[0] * 2 + 1) % mod, (f[1] * 2) % mod
        return f[1]

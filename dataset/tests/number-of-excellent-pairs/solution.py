class Solution:
    def countExcellentPairs(self, nums: list[int], k: int) -> int:
        unique_nums = list(set(nums))
        bit_counts = [bin(x).count('1') for x in unique_nums]
        bit_counts.sort()
        ans = 0
        n = len(bit_counts)
        j = n - 1
        for i in range(n):
            while j >= 0 and bit_counts[i] + bit_counts[j] >= k:
                j -= 1
            ans += (n - 1 - j)
        return ans

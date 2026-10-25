class Solution:
    def sumOfFlooredPairs(self, nums: list[int]) -> int:
        MOD = 10**9 + 7
        max_val = max(nums)
        cnt = [0] * (max_val + 1)
        for x in nums:
            cnt[x] += 1

        pref = [0] * (max_val + 2)
        for i in range(1, max_val + 2):
            pref[i] = pref[i - 1] + (cnt[i - 1] if i - 1 <= max_val else 0)

        ans = 0
        for x in range(1, max_val + 1):
            if cnt[x] == 0:
                continue
            curr_sum = 0
            k = 1
            while k * x <= max_val:
                low = k * x
                high = min(max_val, (k + 1) * x - 1)
                count_in_range = pref[high + 1] - pref[low]
                curr_sum = (curr_sum + k * count_in_range) % MOD
                k += 1
            ans = (ans + cnt[x] * curr_sum) % MOD

        return ans

def test():
    sol = Solution()
    assert sol.sumOfFlooredPairs([2,5,9]) == 10
    assert sol.sumOfFlooredPairs([7,7,7,7,7,7,7]) == 49

if __name__ == '__main__':
    test()

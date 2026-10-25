class Solution:
    def waysToMakeFair(self, nums: list[int]) -> int:
        total_even = sum(nums[i] for i in range(0, len(nums), 2))
        total_odd = sum(nums[i] for i in range(1, len(nums), 2))
        pref_even = 0
        pref_odd = 0
        ans = 0
        for i, x in enumerate(nums):
            if i % 2 == 0:
                suff_even = total_even - pref_even - x
                suff_odd = total_odd - pref_odd
                if pref_even + suff_odd == pref_odd + suff_even:
                    ans += 1
                pref_even += x
            else:
                suff_even = total_even - pref_even
                suff_odd = total_odd - pref_odd - x
                if pref_even + suff_odd == pref_odd + suff_even:
                    ans += 1
                pref_odd += x
        return ans

def test():
    sol = Solution()
    assert sol.waysToMakeFair([2,1,6,4]) == 1
    assert sol.waysToMakeFair([1,1,1]) == 3
    assert sol.waysToMakeFair([1,2,3]) == 0

    print("✓ ways-to-make-a-fair-array passed")

if __name__ == '__main__':
    test()

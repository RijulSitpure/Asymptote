from collections import Counter

class Solution:
    def largestInteger(self, nums: list[int], k: int) -> int:
        n = len(nums)
        if k == n:
            return max(nums)
        count = Counter(nums)
        if k == 1:
            ans = -1
            for x, freq in count.items():
                if freq == 1 and x > ans:
                    ans = x
            return ans
        ans = -1
        if count[nums[0]] == 1:
            ans = max(ans, nums[0])
        if count[nums[-1]] == 1:
            ans = max(ans, nums[-1])
        return ans

def test_find_the_largest_almost_missing_integer():
    sol = Solution()
    assert sol.largestInteger([3, 9, 2, 1, 7], 3) == 7
    assert sol.largestInteger([3, 9, 7, 2, 1, 7], 4) == 3
    assert sol.largestInteger([0, 0], 1) == -1

if __name__ == '__main__':
    test_find_the_largest_almost_missing_integer()
    print('All tests passed.')

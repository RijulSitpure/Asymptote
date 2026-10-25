import bisect

class Solution:
    def minimumMountainRemovals(self, nums: list[int]) -> int:
        n = len(nums)
        lis_left = [1] * n
        tails = []
        for i in range(n):
            idx = bisect.bisect_left(tails, nums[i])
            if idx == len(tails):
                tails.append(nums[i])
            else:
                tails[idx] = nums[i]
            lis_left[i] = idx + 1

        lis_right = [1] * n
        tails = []
        for i in range(n - 1, -1, -1):
            idx = bisect.bisect_left(tails, nums[i])
            if idx == len(tails):
                tails.append(nums[i])
            else:
                tails[idx] = nums[i]
            lis_right[i] = idx + 1

        max_mountain = 0
        for i in range(1, n - 1):
            if lis_left[i] > 1 and lis_right[i] > 1:
                max_mountain = max(max_mountain, lis_left[i] + lis_right[i] - 1)
        return n - max_mountain

def test():
    sol = Solution()
    assert sol.minimumMountainRemovals([1,3,1]) == 0
    assert sol.minimumMountainRemovals([2,1,1,5,6,2,3,1]) == 3

    print("✓ minimum-number-of-removals-to-make-mountain-array passed")

if __name__ == '__main__':
    test()

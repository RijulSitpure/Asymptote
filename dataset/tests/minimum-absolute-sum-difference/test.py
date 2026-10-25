import bisect

class Solution:
    def minAbsoluteSumDiff(self, nums1: list[int], nums2: list[int]) -> int:
        MOD = 10**9 + 7
        n = len(nums1)
        sorted_nums1 = sorted(nums1)

        total = sum(abs(a - b) for a, b in zip(nums1, nums2))
        max_gain = 0

        for a, b in zip(nums1, nums2):
            orig_diff = abs(a - b)
            idx = bisect.bisect_left(sorted_nums1, b)
            if idx < n:
                max_gain = max(max_gain, orig_diff - abs(sorted_nums1[idx] - b))
            if idx > 0:
                max_gain = max(max_gain, orig_diff - abs(sorted_nums1[idx - 1] - b))

        return (total - max_gain) % MOD

def test():
    sol = Solution()
    assert sol.minAbsoluteSumDiff([1,7,5], [2,3,5]) == 3
    assert sol.minAbsoluteSumDiff([2,4,6,8,10], [2,4,6,8,10]) == 0
    assert sol.minAbsoluteSumDiff([1,10,4,4,2,7], [9,3,5,1,7,4]) == 20

if __name__ == '__main__':
    test()

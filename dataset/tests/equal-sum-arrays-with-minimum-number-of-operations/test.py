class Solution:
    def minOperations(self, nums1: list[int], nums2: list[int]) -> int:
        s1, s2 = sum(nums1), sum(nums2)
        if s1 < s2:
            nums1, nums2 = nums2, nums1
            s1, s2 = s2, s1

        diff = s1 - s2
        if diff == 0:
            return 0

        gains = [0] * 6
        for x in nums1:
            gains[x - 1] += 1
        for x in nums2:
            gains[6 - x] += 1

        ops = 0
        for g in range(5, 0, -1):
            if gains[g] == 0:
                continue
            take = min(gains[g], (diff + g - 1) // g)
            ops += take
            diff -= take * g
            if diff <= 0:
                return ops

        return -1

def test():
    sol = Solution()
    assert sol.minOperations([1,2,3,4,5,6], [1,1,2,2,2,2]) == 3
    assert sol.minOperations([1,1,1,1,1,1,1], [6]) == -1
    assert sol.minOperations([6,6], [1]) == 3

    print("✓ equal-sum-arrays-with-minimum-number-of-operations passed")

if __name__ == '__main__':
    test()

class Solution:
    def minSumSquareDiff(self, nums1: list[int], nums2: list[int], k1: int, k2: int) -> int:
        k = k1 + k2
        diffs = [abs(a - b) for a, b in zip(nums1, nums2)]
        if sum(diffs) <= k:
            return 0
        max_d = max(diffs)
        count = [0] * (max_d + 1)
        for d in diffs:
            count[d] += 1
        for d in range(max_d, 0, -1):
            if count[d] > 0:
                take = min(k, count[d])
                count[d - 1] += take
                count[d] -= take
                k -= take
                if k == 0:
                    break
        return sum(c * (d ** 2) for d, c in enumerate(count))

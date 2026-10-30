class Solution:
    def kthSmallestProduct(self, nums1: list[int], nums2: list[int], k: int) -> int:
        def count_le(target: int) -> int:
            total = 0
            n2 = len(nums2)
            for x in nums1:
                if x > 0:
                    l, r = 0, n2
                    while l < r:
                        mid = (l + r) // 2
                        if x * nums2[mid] <= target:
                            l = mid + 1
                        else:
                            r = mid
                    total += l
                elif x < 0:
                    l, r = 0, n2
                    while l < r:
                        mid = (l + r) // 2
                        if x * nums2[mid] <= target:
                            r = mid
                        else:
                            l = mid + 1
                    total += (n2 - l)
                else:
                    if target >= 0:
                        total += n2
            return total

        low = -10**10
        high = 10**10
        ans = high
        while low <= high:
            mid = (low + high) // 2
            if count_le(mid) >= k:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
        return ans

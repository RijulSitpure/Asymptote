from typing import List

class Solution:
    def minSubarraySort(self, nums: List[int], k: int) -> List[int]:
        n = len(nums)
        ans = []
        for i in range(n - k + 1):
            left, right = -1, -1
            mx = nums[i]
            for j in range(i, i + k):
                if nums[j] < mx:
                    right = j
                else:
                    mx = nums[j]
            if right == -1:
                ans.append(0)
                continue
            mi = nums[i + k - 1]
            for j in range(i + k - 1, i - 1, -1):
                if nums[j] > mi:
                    left = j
                else:
                    mi = nums[j]
            ans.append(right - left + 1)
        return ans

def run_tests():
    s = Solution()
    res = s.minSubarraySort([1, 3, 2, 4, 5], 3)
    assert res == [2, 2, 0], f"Expected [2, 2, 0], got {res}"
    print("3555 smallest-subarray-to-sort-in-every-sliding-window PASSED")

if __name__ == "__main__":
    run_tests()

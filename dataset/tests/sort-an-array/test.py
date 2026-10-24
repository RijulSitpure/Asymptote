from typing import List

class Solution:
    def sortArray(self, nums: List[int]) -> List[int]:
        if len(nums) <= 1:
            return nums
        mid = len(nums) // 2
        left = self.sortArray(nums[:mid])
        right = self.sortArray(nums[mid:])
        merged = []
        i = j = 0
        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
                merged.append(left[i])
                i += 1
            else:
                merged.append(right[j])
                j += 1
        merged.extend(left[i:])
        merged.extend(right[j:])
        return merged

def test():
    sol = Solution()
    assert sol.sortArray([5, 2, 3, 1]) == [1, 2, 3, 5], "test 1 failed"
    assert sol.sortArray([5, 1, 1, 2, 0, 0]) == [0, 0, 1, 1, 2, 5], "test 2 failed"
    print("✓ sort-an-array passed")

if __name__ == "__main__":
    test()

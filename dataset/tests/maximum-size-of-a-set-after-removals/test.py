import sys
from solution import Solution
sol = Solution()

res = sol.maximumSetSize(nums1 = [1,2,1,2], nums2 = [1,1,1,1])
assert res == 2, f'Expected 2, got {res}'
res = sol.maximumSetSize(nums1 = [1,2,3,4,5,6], nums2 = [2,3,2,3,2,3])
assert res == 5, f'Expected 5, got {res}'
res = sol.maximumSetSize(nums1 = [1,1,2,2,3,3], nums2 = [4,4,5,5,6,6])
assert res == 6, f'Expected 6, got {res}'
print('All tests passed!')

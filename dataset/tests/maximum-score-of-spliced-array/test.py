from solution import Solution
s = Solution()
assert s.maximumsSplicedArray([60,60,60], [10,90,10]) == 210
assert s.maximumsSplicedArray([20,40,20,50,70], [50,20,50,40,20]) == 240
assert s.maximumsSplicedArray([7,11,13], [1,1,1]) == 31
print("All tests passed for maximum-score-of-spliced-array!")

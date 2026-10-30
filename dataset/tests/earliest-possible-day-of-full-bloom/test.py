from solution import Solution

s = Solution()
assert s.earliestFullBloom([1,4,3], [2,3,1]) == 9
assert s.earliestFullBloom([1,2,3,2], [2,1,2,1]) == 9
assert s.earliestFullBloom([1], [1]) == 2
print("All tests passed for earliest-possible-day-of-full-bloom!")

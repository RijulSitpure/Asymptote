from solution import Solution
s = Solution()
assert s.fullBloomFlowers([[1,6],[3,7],[9,12],[4,13]], [2,3,7,11]) == [1,2,2,2]
assert s.fullBloomFlowers([[1,10],[3,3]], [3,3,2]) == [2,2,1]
print("All tests passed for number-of-flowers-in-full-bloom!")

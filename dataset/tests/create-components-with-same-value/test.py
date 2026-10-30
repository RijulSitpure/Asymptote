from solution import Solution
s = Solution()
assert s.componentValue([6,2,2,2,6], [[0,1],[1,2],[1,3],[3,4]]) == 2
assert s.componentValue([2], []) == 0
print("All tests passed for create-components-with-same-value!")

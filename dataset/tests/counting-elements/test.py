class Solution:
    def countElements(self, arr: list[int]) -> int:
        s = set(arr)
        return sum(1 for x in arr if x + 1 in s)

sol = Solution()
assert sol.countElements([1,2,3]) == 2
assert sol.countElements([1,1,3,3,5,5,7,7]) == 0
assert sol.countElements([1,3,2,3,5,0]) == 3
print("All tests passed successfully.")

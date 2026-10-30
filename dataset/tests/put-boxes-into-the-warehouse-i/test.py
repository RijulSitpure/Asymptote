class Solution:
    def maxBoxesInWarehouse(self, boxes: list[int], warehouse: list[int]) -> int:
        n = len(warehouse)
        for i in range(1, n):
            warehouse[i] = min(warehouse[i], warehouse[i - 1])
        boxes.sort()
        ans = 0
        i = n - 1
        for b in boxes:
            while i >= 0 and warehouse[i] < b:
                i -= 1
            if i < 0: break
            ans += 1
            i -= 1
        return ans

sol = Solution()
assert sol.maxBoxesInWarehouse([4,3,4,1], [5,3,3,4,1]) == 3
assert sol.maxBoxesInWarehouse([1,2,2,3,4], [3,4,1,2]) == 3
print("All tests passed successfully.")

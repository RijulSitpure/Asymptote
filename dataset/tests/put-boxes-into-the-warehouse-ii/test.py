class Solution:
    def maxBoxesInWarehouse(self, boxes: list[int], warehouse: list[int]) -> int:
        boxes.sort(reverse=True)
        l, r = 0, len(warehouse) - 1
        ans = 0
        for b in boxes:
            if l > r: break
            if warehouse[l] >= b:
                ans += 1
                l += 1
            elif warehouse[r] >= b:
                ans += 1
                r -= 1
        return ans

sol = Solution()
assert sol.maxBoxesInWarehouse([1,2,2,3,4], [3,4,1,2]) == 4
assert sol.maxBoxesInWarehouse([3,5,5,2], [2,1,3,4,5]) == 3
print("All tests passed successfully.")

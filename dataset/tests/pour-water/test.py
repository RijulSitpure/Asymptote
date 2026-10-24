from typing import List

class Solution:
    def pourWater(self, heights: List[int], volume: int, k: int) -> List[int]:
        n = len(heights)
        for _ in range(volume):
            best = k
            for i in range(k - 1, -1, -1):
                if heights[i] > heights[i + 1]:
                    break
                if heights[i] < heights[best]:
                    best = i
            if best != k:
                heights[best] += 1
                continue
            for i in range(k + 1, n):
                if heights[i] > heights[i - 1]:
                    break
                if heights[i] < heights[best]:
                    best = i
            heights[best] += 1
        return heights

def test():
    sol = Solution()
    assert sol.pourWater([2,1,1,2,1,2,2], 4, 3) == [2,2,2,3,2,2,2], "test 1 failed"
    assert sol.pourWater([1,2,3,4], 2, 2) == [2,3,3,4], "test 2 failed"
    print("✓ pour-water passed")

if __name__ == "__main__":
    test()

import heapq
from typing import List

class Solution:
    def smallestRange(self, nums: List[List[int]]) -> List[int]:
        heap = []
        curr_max = float("-inf")
        for i in range(len(nums)):
            heapq.heappush(heap, (nums[i][0], i, 0))
            curr_max = max(curr_max, nums[i][0])

        best_range = [float("-inf"), float("inf")]

        while heap:
            val, r, c = heapq.heappop(heap)
            if curr_max - val < best_range[1] - best_range[0]:
                best_range = [val, curr_max]
            if c + 1 == len(nums[r]):
                break
            nxt_val = nums[r][c + 1]
            curr_max = max(curr_max, nxt_val)
            heapq.heappush(heap, (nxt_val, r, c + 1))

        return best_range

def test():
    sol = Solution()
    t1 = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]
    assert sol.smallestRange(t1) == [20,24], "test 1 failed"
    t2 = [[1,2,3],[1,2,3],[1,2,3]]
    assert sol.smallestRange(t2) == [1,1], "test 2 failed"
    print("✓ smallest-range-covering-elements-from-k-lists passed")

if __name__ == "__main__":
    test()

import sys
from typing import List

class Solution:
    def kSmallestPairs(self, nums1: List[int], nums2: List[int], k: int) -> List[List[int]]:
        import heapq
        if not nums1 or not nums2 or k <= 0:
            return []
        heap = []
        for i in range(min(k, len(nums1))):
            heapq.heappush(heap, (nums1[i] + nums2[0], i, 0))
        res = []
        while heap and len(res) < k:
            _, i, j = heapq.heappop(heap)
            res.append([nums1[i], nums2[j]])
            if j + 1 < len(nums2):
                heapq.heappush(heap, (nums1[i] + nums2[j + 1], i, j + 1))
        return res

def test():
    sol = Solution()
    assert sol.kSmallestPairs([1,7,11], [2,4,6], 3) == [[1,2],[1,4],[1,6]], "test 1 failed"
    assert sol.kSmallestPairs([1,1,2], [1,2,3], 2) == [[1,1],[1,1]], "test 2 failed"
    print("✓ find-k-pairs-with-smallest-sums passed")

if __name__ == "__main__":
    test()

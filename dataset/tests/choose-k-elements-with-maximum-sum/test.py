import heapq

class Solution:
    def findMaxSum(self, nums1: list[int], nums2: list[int], k: int) -> list[int]:
        n = len(nums1)
        arr = sorted(zip(nums1, nums2, range(n)))
        ans = [0] * n
        min_heap = []
        current_sum = 0
        
        i = 0
        while i < n:
            j = i
            while j < n and arr[j][0] == arr[i][0]:
                j += 1
            for idx in range(i, j):
                ans[arr[idx][2]] = current_sum
            for idx in range(i, j):
                val2 = arr[idx][1]
                current_sum += val2
                heapq.heappush(min_heap, val2)
                if len(min_heap) > k:
                    current_sum -= heapq.heappop(min_heap)
            i = j
            
        return ans

def test_choose_k_elements_with_maximum_sum():
    sol = Solution()
    assert sol.findMaxSum([4, 2, 1, 5, 3], [10, 20, 30, 40, 50], 2) == [80, 30, 0, 80, 50]
    assert sol.findMaxSum([2, 2, 2, 2], [3, 1, 2, 3], 1) == [0, 0, 0, 0]

if __name__ == '__main__':
    test_choose_k_elements_with_maximum_sum()
    print('All tests passed.')

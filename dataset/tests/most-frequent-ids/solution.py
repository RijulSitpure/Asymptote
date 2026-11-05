import heapq

class Solution:
    def mostFrequentIDs(self, nums: list[int], freq: list[int]) -> list[int]:
        counts = {}
        heap = []
        ans = []
        for x, f in zip(nums, freq):
            new_f = counts.get(x, 0) + f
            counts[x] = new_f
            heapq.heappush(heap, (-new_f, x))
            while heap and -heap[0][0] != counts.get(heap[0][1], 0):
                heapq.heappop(heap)
            ans.append(-heap[0][0] if heap else 0)
        return ans

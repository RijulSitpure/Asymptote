import heapq

class Solution:
    def eatenApples(self, apples: list[int], days: list[int]) -> int:
        heap = []
        i = 0
        ans = 0
        n = len(apples)
        while i < n or heap:
            if i < n and apples[i] > 0:
                heapq.heappush(heap, [i + days[i], apples[i]])
            while heap and heap[0][0] <= i:
                heapq.heappop(heap)
            if heap:
                ans += 1
                heap[0][1] -= 1
                if heap[0][1] == 0:
                    heapq.heappop(heap)
            i += 1
        return ans

def test():
    sol = Solution()
    assert sol.eatenApples([1,2,3,5,2], [3,2,1,4,2]) == 7
    assert sol.eatenApples([3,0,0,0,0,2], [3,0,0,0,0,2]) == 5

    print("✓ maximum-number-of-eaten-apples passed")

if __name__ == '__main__':
    test()

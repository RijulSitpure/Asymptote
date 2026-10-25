import heapq

class Solution:
    def isPossible(self, target: list[int]) -> bool:
        total = sum(target)
        max_heap = [-x for x in target]
        heapq.heapify(max_heap)
        while True:
            largest = -heapq.heappop(max_heap)
            rest = total - largest
            if largest == 1 or rest == 1:
                return True
            if rest == 0 or largest <= rest or largest % rest == 0:
                return False
            prev = largest % rest
            total = rest + prev
            heapq.heappush(max_heap, -prev)

def test():
    sol = Solution()
    assert sol.isPossible([9,3,5]) == True, "test 1 failed"
    assert sol.isPossible([1,1,1,2]) == False, "test 2 failed"
    assert sol.isPossible([8,5]) == True, "test 3 failed"
    print("✓ construct-target-array-with-multiple-sums passed")

if __name__ == "__main__":
    test()

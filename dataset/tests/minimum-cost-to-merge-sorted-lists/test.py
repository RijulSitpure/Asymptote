import heapq

class Solution:
    def minMergeCost(self, lists: list[list[int]]) -> int:
        if len(lists) <= 1:
            return 0
        
        pq = [len(lst) for lst in lists]
        heapq.heapify(pq)
        
        total_cost = 0
        while len(pq) > 1:
            a = heapq.heappop(pq)
            b = heapq.heappop(pq)
            merged = a + b
            total_cost += merged
            heapq.heappush(pq, merged)
        return total_cost

def run_tests():
    sol = Solution()
    # lists of sizes 1, 2, 3: merge 1+2=3 (cost 3), merge 3+3=6 (cost 6) -> total 9
    assert sol.minMergeCost([[1], [2, 3], [4, 5, 6]]) == 9
    assert sol.minMergeCost([[1]]) == 0
    print("All tests passed for 3801.")

if __name__ == "__main__":
    run_tests()

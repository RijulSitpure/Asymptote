import heapq

class Solution:
    def maxTransactions(self, amounts: list[int]) -> int:
        running_sum = 0
        min_heap = [] # stores negative transactions taken
        count = 0
        for x in amounts:
            if x >= 0:
                running_sum += x
                count += 1
            else:
                running_sum += x
                count += 1
                heapq.heappush(min_heap, x)
                if running_sum < 0:
                    # Pop the most negative transaction to restore feasibility
                    worst = heapq.heappop(min_heap)
                    running_sum -= worst
                    count -= 1
        return count

def run_tests():
    sol = Solution()
    assert sol.maxTransactions([4, -2, -3, 5, -1]) == 4
    assert sol.maxTransactions([-2, 5, -1]) == 2 # discard first -2, take 5 and -1
    assert sol.maxTransactions([1, -5, 2, -1]) == 3 # take 1, discard -5, take 2, take -1
    print("All tests passed for 3711.")

if __name__ == "__main__":
    run_tests()
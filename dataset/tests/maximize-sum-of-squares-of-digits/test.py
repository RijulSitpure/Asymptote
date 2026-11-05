import heapq

class Solution:
    def maximizeSumOfSquares(self, digits: list[int], k: int) -> int:
        # Each operation increments a digit d (d < 9) to d + 1
        # Marginal gain in square: (d + 1)^2 - d^2 = 2d + 1
        # Max-heap based on marginal gain
        pq = []
        for i, d in enumerate(digits):
            if d < 9:
                heapq.heappush(pq, (-(2 * d + 1), d, i))
                
        d_vals = list(digits)
        for _ in range(k):
            if not pq:
                break
            neg_gain, d, idx = heapq.heappop(pq)
            d_vals[idx] += 1
            new_d = d_vals[idx]
            if new_d < 9:
                heapq.heappush(pq, (-(2 * new_d + 1), new_d, idx))
                
        return sum(x * x for x in d_vals)

def run_tests():
    sol = Solution()
    assert sol.maximizeSumOfSquares([1, 2], 1) == 10
    assert sol.maximizeSumOfSquares([9, 9], 2) == 162 # 81 + 81
    assert sol.maximizeSumOfSquares([0], 2) == 4 # 0 -> 1 -> 2 -> 2^2 = 4
    print("All tests passed for 3723.")

if __name__ == "__main__":
    run_tests()
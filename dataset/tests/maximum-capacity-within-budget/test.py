class Solution:
    def maxCapacity(self, costs: list[int], budget: int) -> int:
        total_cost = sum(costs)
        if total_cost == 0:
            return budget
        return budget // total_cost

def run_tests():
    sol = Solution()
    assert sol.maxCapacity([2, 3, 5], 30) == 3 # sum=10, 30 // 10 = 3
    assert sol.maxCapacity([1, 1], 5) == 2
    print("All tests passed for 3814.")

if __name__ == "__main__":
    run_tests()

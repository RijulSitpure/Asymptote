class Solution:
    def minAcquisitionCost(self, individual: list[int], bundle_cost: int) -> int:
        return min(sum(individual), bundle_cost)

def run_tests():
    sol = Solution()
    assert sol.minAcquisitionCost([5, 10, 15], 25) == 25 # 5+10+15 = 30 > 25
    assert sol.minAcquisitionCost([2, 3, 4], 20) == 9 # 2+3+4 = 9 < 20
    print("All tests passed for 3789.")

if __name__ == "__main__":
    run_tests()

class Solution:
    def minNumberOperations(self, target: list[int]) -> int:
        ans = target[0]
        for i in range(1, len(target)):
            if target[i] > target[i - 1]:
                ans += target[i] - target[i - 1]
        return ans

def run_tests():
    sol = Solution()
    assert sol.minNumberOperations([1, 2, 3, 2, 1]) == 3
    assert sol.minNumberOperations([3, 1, 1, 2]) == 4
    assert sol.minNumberOperations([3, 1, 5, 4, 2]) == 7
    print("All tests passed for 3810.")

if __name__ == "__main__":
    run_tests()

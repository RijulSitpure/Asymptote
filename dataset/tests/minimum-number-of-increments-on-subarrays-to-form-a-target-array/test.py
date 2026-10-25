class Solution:
    def minNumberOperations(self, target: list[int]) -> int:
        ans = target[0]
        for i in range(1, len(target)):
            if target[i] > target[i - 1]:
                ans += target[i] - target[i - 1]
        return ans

def test():
    sol = Solution()
    assert sol.minNumberOperations([1,2,3,2,1]) == 3, "test 1 failed"
    assert sol.minNumberOperations([3,1,1,2]) == 4, "test 2 failed"
    assert sol.minNumberOperations([3,1,5,4,2]) == 7, "test 3 failed"
    print("✓ minimum-number-of-increments-on-subarrays-to-form-a-target-array passed")

if __name__ == "__main__":
    test()

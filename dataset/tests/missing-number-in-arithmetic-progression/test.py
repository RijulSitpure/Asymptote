class Solution:
    def missingNumber(self, arr: list[int]) -> int:
        n = len(arr)
        diff = (arr[-1] - arr[0]) // n
        for i in range(n):
            expected = arr[0] + i * diff
            if arr[i] != expected:
                return expected
        return arr[0]

def test():
    sol = Solution()
    assert sol.missingNumber([5, 7, 11, 13]) == 9, "test 1 failed"
    assert sol.missingNumber([15, 13, 12]) == 14, "test 2 failed"
    print("✓ missing-number-in-arithmetic-progression passed")

if __name__ == "__main__":
    test()

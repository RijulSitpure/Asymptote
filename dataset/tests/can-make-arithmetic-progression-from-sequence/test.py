class Solution:
    def canMakeArithmeticProgression(self, arr: list[int]) -> bool:
        arr.sort()
        diff = arr[1] - arr[0]
        for i in range(2, len(arr)):
            if arr[i] - arr[i - 1] != diff:
                return False
        return True

def test():
    sol = Solution()
    assert sol.canMakeArithmeticProgression([3,5,1]) == True, "test 1 failed"
    assert sol.canMakeArithmeticProgression([1,2,4]) == False, "test 2 failed"
    print("✓ can-make-arithmetic-progression-from-sequence passed")

if __name__ == "__main__":
    test()

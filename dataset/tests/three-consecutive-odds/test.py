class Solution:
    def threeConsecutiveOdds(self, arr: list[int]) -> bool:
        for i in range(len(arr) - 2):
            if arr[i] % 2 == 1 and arr[i + 1] % 2 == 1 and arr[i + 2] % 2 == 1:
                return True
        return False

def test():
    sol = Solution()
    assert sol.threeConsecutiveOdds([2,6,4,1]) == False, "test 1 failed"
    assert sol.threeConsecutiveOdds([1,2,34,3,4,5,7,23,12]) == True, "test 2 failed"
    print("✓ three-consecutive-odds passed")

if __name__ == "__main__":
    test()

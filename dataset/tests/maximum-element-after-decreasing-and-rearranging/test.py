class Solution:
    def maximumElementAfterDecrementingAndRearranging(self, arr: list[int]) -> int:
        arr.sort()
        arr[0] = 1
        for i in range(1, len(arr)):
            arr[i] = min(arr[i], arr[i - 1] + 1)
        return arr[-1]

def test():
    sol = Solution()
    assert sol.maximumElementAfterDecrementingAndRearranging([2,2,1,2,1]) == 2
    assert sol.maximumElementAfterDecrementingAndRearranging([100,1,1000]) == 3
    assert sol.maximumElementAfterDecrementingAndRearranging([1,2,3,4,5]) == 5

if __name__ == '__main__':
    test()

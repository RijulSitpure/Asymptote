class Solution:
    def minimumAbsDifference(self, arr: list[int]) -> list[list[int]]:
        arr.sort()
        min_diff = min(arr[i] - arr[i - 1] for i in range(1, len(arr)))
        return [[arr[i - 1], arr[i]] for i in range(1, len(arr)) if arr[i] - arr[i - 1] == min_diff]

def test():
    sol = Solution()
    assert sol.minimumAbsDifference([4, 2, 1, 3]) == [[1, 2], [2, 3], [3, 4]], "test 1 failed"
    assert sol.minimumAbsDifference([1, 3, 6, 10, 15]) == [[1, 3]], "test 2 failed"
    assert sol.minimumAbsDifference([3, 8, -10, 23, 19, -4, -14, 27]) == [[-14, -10], [19, 23], [23, 27]], "test 3 failed"
    print("✓ minimum-absolute-difference passed")

if __name__ == "__main__":
    test()

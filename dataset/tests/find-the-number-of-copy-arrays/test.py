
class Solution:
    def countArrays(self, original: list[int], bounds: list[list[int]]) -> int:
        n = len(original)
        lo = bounds[0][0]
        hi = bounds[0][1]
        for i in range(1, n):
            diff = original[i] - original[0]
            lo = max(lo, bounds[i][0] - diff)
            hi = min(hi, bounds[i][1] - diff)
        return max(0, hi - lo + 1)

def test_find_the_number_of_copy_arrays():
    sol = Solution()
    assert sol.countArrays([1, 2, 3, 4], [[1, 2], [2, 3], [3, 4], [4, 5]]) == 2
    assert sol.countArrays([1, 2, 3, 4], [[1, 10], [2, 9], [3, 8], [4, 7]]) == 4
    assert sol.countArrays([1, 2, 1, 2], [[1, 1], [2, 3], [3, 3], [2, 3]]) == 0

if __name__ == '__main__':
    test_find_the_number_of_copy_arrays()
    print('All tests passed.')

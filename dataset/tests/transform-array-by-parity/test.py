
class Solution:
    def transformArray(self, nums: list[int]) -> list[int]:
        even_count = sum(1 for x in nums if x % 2 == 0)
        return [0] * even_count + [1] * (len(nums) - even_count)

def test_transform_array_by_parity():
    sol = Solution()
    assert sol.transformArray([4, 3, 2, 1]) == [0, 0, 1, 1]
    assert sol.transformArray([1, 5, 1, 4, 2]) == [0, 0, 1, 1, 1]

if __name__ == '__main__':
    test_transform_array_by_parity()
    print('All tests passed.')

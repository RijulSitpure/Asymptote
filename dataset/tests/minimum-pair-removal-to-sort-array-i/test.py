class Solution:
    def minimumPairRemoval(self, nums: list[int]) -> int:
        def is_sorted(arr):
            return all(arr[i] <= arr[i + 1] for i in range(len(arr) - 1))

        ops = 0
        curr = list(nums)
        while not is_sorted(curr):
            min_sum = float('inf')
            min_idx = -1
            for i in range(len(curr) - 1):
                s = curr[i] + curr[i + 1]
                if s < min_sum:
                    min_sum = s
                    min_idx = i
            curr[min_idx] = min_sum
            curr.pop(min_idx + 1)
            ops += 1
        return ops

def run_tests():
    s = Solution()
    assert s.minimumPairRemoval([5, 2, 3, 1]) == 2
    assert s.minimumPairRemoval([1, 2, 3]) == 0
    print("All tests passed for minimum-pair-removal-to-sort-array-i")

if __name__ == '__main__':
    run_tests()

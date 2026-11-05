class Solution:
    def maxSubarrays(self, n: int, conflictingPairs: list[list[int]]) -> int:
        valid_subarrays = 0
        max_left = 0
        second_max_left = 0
        gains = [0] * (n + 1)
        conflicts = [[] for _ in range(n + 1)]

        for a, b in conflictingPairs:
            conflicts[max(a, b)].append(min(a, b))

        for right in range(1, n + 1):
            for left in conflicts[right]:
                if left > max_left:
                    second_max_left = max_left
                    max_left = left
                elif left > second_max_left:
                    second_max_left = left
                    
            valid_subarrays += right - max_left
            gains[max_left] += max_left - second_max_left

        max_gain = 0
        for i in range(1, n + 1):
            if gains[i] > max_gain:
                max_gain = gains[i]
                
        return valid_subarrays + max_gain

def test_maximize_subarrays_after_removing_one_conflicting_pair():
    sol = Solution()
    assert sol.maxSubarrays(4, [[2, 3], [1, 4]]) == 9
    assert sol.maxSubarrays(5, [[1, 2], [2, 5], [3, 5]]) == 12
    assert sol.maxSubarrays(4, [[1, 2], [2, 3], [3, 4]]) == 5

if __name__ == '__main__':
    test_maximize_subarrays_after_removing_one_conflicting_pair()
    print('All tests passed.')

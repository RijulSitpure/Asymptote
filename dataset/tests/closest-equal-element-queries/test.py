class Solution:
    def solveQueries(self, nums: list[int], queries: list[int]) -> list[int]:
        n = len(nums)
        min_dist = [n] * n
        last_seen = {}

        for i in range(2 * n):
            idx = i % n
            val = nums[idx]
            if val in last_seen:
                prev_idx = last_seen[val] % n
                d = i - last_seen[val]
                if d < min_dist[idx]:
                    min_dist[idx] = d
                if d < min_dist[prev_idx]:
                    min_dist[prev_idx] = d
            last_seen[val] = i

        return [min_dist[q] if min_dist[q] < n else -1 for q in queries]

def run_tests():
    s = Solution()
    assert s.solveQueries([1, 2, 3, 1], [0, 1]) == [1, -1]
    assert s.solveQueries([2, 2, 2], [0, 1, 2]) == [1, 1, 1]
    print("All tests passed for closest-equal-element-queries")

if __name__ == '__main__':
    run_tests()

class Solution:
    def minMirrorPairDistance(self, nums: list[int]) -> int:
        def rev(val: int) -> int:
            return int(str(val)[::-1])
        
        last_seen = {}
        min_dist = float('inf')
        for j, val in enumerate(nums):
            if val in last_seen:
                min_dist = min(min_dist, j - last_seen[val])
            last_seen[rev(val)] = j
        return min_dist if min_dist != float('inf') else -1

def run_tests():
    sol = Solution()
    assert sol.minMirrorPairDistance([12, 34, 21, 43]) == 2
    assert sol.minMirrorPairDistance([10, 20, 30]) == -1
    assert sol.minMirrorPairDistance([12, 21]) == 1
    print("All tests passed for 3761.")

if __name__ == "__main__":
    run_tests()

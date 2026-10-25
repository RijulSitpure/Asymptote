class Solution:
    def minTaps(self, n: int, ranges: list[int]) -> int:
        max_reach = [0] * (n + 1)
        for i, r in enumerate(ranges):
            left = max(0, i - r)
            right = min(n, i + r)
            max_reach[left] = max(max_reach[left], right)
        taps = 0
        cur_end = 0
        next_end = 0
        for i in range(n):
            next_end = max(next_end, max_reach[i])
            if i == cur_end:
                if next_end <= i:
                    return -1
                cur_end = next_end
                taps += 1
        return taps

def test():
    sol = Solution()
    assert sol.minTaps(5, [3,4,1,1,0,0]) == 1, "test 1 failed"
    assert sol.minTaps(3, [0,0,0,0]) == -1, "test 2 failed"
    print("✓ minimum-number-of-taps-to-open-to-water-a-garden passed")

if __name__ == "__main__":
    test()

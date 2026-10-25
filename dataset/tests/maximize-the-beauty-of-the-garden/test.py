class Solution:
    def maximumBeauty(self, flowers: list[int]) -> int:
        n = len(flowers)
        pos_pref = [0] * (n + 1)
        for i, f in enumerate(flowers):
            pos_pref[i + 1] = pos_pref[i] + max(0, f)

        first = {}
        ans = float('-inf')
        for i, f in enumerate(flowers):
            if f in first:
                start = first[f]
                # Boundary flowers contribute 2 * f
                # Internal flowers contribute sum of positive values in (start, i)
                internal_pos = pos_pref[i] - pos_pref[start + 1]
                ans = max(ans, 2 * f + internal_pos)
            else:
                first[f] = i
        return ans

def test():
    sol = Solution()
    assert sol.maximumBeauty([1,2,3,1,2]) == 8
    assert sol.maximumBeauty([100,1,1,-3,1]) == 3
    assert sol.maximumBeauty([-1,-2,0,-1]) == -2

    print("✓ maximize-the-beauty-of-the-garden passed")

if __name__ == '__main__':
    test()

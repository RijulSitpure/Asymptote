class Solution:
    def numEquivDominoPairs(self, dominoes: list[list[int]]) -> int:
        counts = [0] * 100
        total = 0
        for a, b in dominoes:
            key = min(a, b) * 10 + max(a, b)
            total += counts[key]
            counts[key] += 1
        return total

def test():
    sol = Solution()
    assert sol.numEquivDominoPairs([[1,2],[2,1],[3,4],[5,6]]) == 1, "test 1 failed"
    assert sol.numEquivDominoPairs([[1,2],[1,2],[1,1],[1,2],[2,2]]) == 3, "test 2 failed"
    print("✓ number-of-equivalent-domino-pairs passed")

if __name__ == "__main__":
    test()

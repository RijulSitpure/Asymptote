from collections import defaultdict

class Solution:
    def findRotateSteps(self, ring: str, key: str) -> int:
        n = len(ring)
        pos_map = defaultdict(list)
        for i, ch in enumerate(ring):
            pos_map[ch].append(i)

        memo = {}

        def dp(r: int, k: int) -> int:
            if k == len(key):
                return 0
            state = (r, k)
            if state in memo:
                return memo[state]
            min_steps = float("inf")
            target_char = key[k]
            for nxt in pos_map[target_char]:
                diff = abs(r - nxt)
                dist = min(diff, n - diff)
                min_steps = min(min_steps, dist + 1 + dp(nxt, k + 1))
            memo[state] = min_steps
            return min_steps

        return dp(0, 0)

def test():
    sol = Solution()
    assert sol.findRotateSteps("godding", "gd") == 4, "test 1 failed"
    assert sol.findRotateSteps("godding", "godding") == 13, "test 2 failed"
    print("✓ freedom-trail passed")

if __name__ == "__main__":
    test()

class Solution:
    def countDistinctPoints(self, s: str, k: int) -> int:
        delta = {'U': (0, 1), 'D': (0, -1), 'L': (-1, 0), 'R': (1, 0)}
        n = len(s)
        cur_dx = sum(delta[s[i]][0] for i in range(k))
        cur_dy = sum(delta[s[i]][1] for i in range(k))
        distinct_displacements = {(cur_dx, cur_dy)}
        for i in range(k, n):
            cur_dx += delta[s[i]][0] - delta[s[i - k]][0]
            cur_dy += delta[s[i]][1] - delta[s[i - k]][1]
            distinct_displacements.add((cur_dx, cur_dy))
        return len(distinct_displacements)

def run_tests():
    sol = Solution()
    assert sol.countDistinctPoints("UDLR", 2) == 2 # windows: UD -> (0,0), DL -> (-1,-1), LR -> (0,0) -> 2 distinct
    assert sol.countDistinctPoints("RRRR", 2) == 1 # all windows are RR
    print("All tests passed for 3694.")

if __name__ == "__main__":
    run_tests()

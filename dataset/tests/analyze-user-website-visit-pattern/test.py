from collections import defaultdict, Counter
from itertools import combinations

class Solution:
    def mostVisitedPattern(self, username: list[str], timestamp: list[int], website: list[str]) -> list[str]:
        visits = sorted(zip(timestamp, username, website))
        user_history = defaultdict(list)
        for t, u, w in visits:
            user_history[u].append(w)
        
        pattern_counts = Counter()
        for u, history in user_history.items():
            if len(history) >= 3:
                unique_patterns = set(combinations(history, 3))
                for pat in unique_patterns:
                    pattern_counts[pat] += 1
        
        best_pattern = min(pattern_counts.keys(), key=lambda p: (-pattern_counts[p], p))
        return list(best_pattern)

def test():
    sol = Solution()
    u1 = ["joe","joe","joe","james","james","james","james","mary","mary","mary"]
    t1 = [1,2,3,4,5,6,7,8,9,10]
    w1 = ["home","about","career","home","cart","maps","home","home","about","career"]
    assert sol.mostVisitedPattern(u1, t1, w1) == ["home","about","career"], "test 1 failed"
    u2 = ["ua","ua","ua","ub","ub","ub"]
    t2 = [1,2,3,4,5,6]
    w2 = ["a","b","a","a","b","c"]
    assert sol.mostVisitedPattern(u2, t2, w2) == ["a","b","a"], "test 2 failed"
    print("✓ analyze-user-website-visit-pattern passed")

if __name__ == "__main__":
    test()

from typing import List
from collections import defaultdict

class Solution:
    def highFive(self, items: List[List[int]]) -> List[List[int]]:
        scores = defaultdict(list)
        for sid, sc in items:
            scores[sid].append(sc)
        res = []
        for sid in sorted(scores.keys()):
            top5 = sorted(scores[sid], reverse=True)[:5]
            res.append([sid, sum(top5) // 5])
        return res

def test():
    sol = Solution()
    items = [[1,91],[1,92],[2,93],[2,97],[1,60],[2,77],[1,65],[1,87],[1,100],[2,100],[2,76]]
    res = sol.highFive(items)
    assert res == [[1,87],[2,88]], "test 1 failed"
    print("✓ high-five passed")

if __name__ == "__main__":
    test()

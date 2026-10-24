from typing import List
import collections

class Solution:
    def pyramidTransition(self, bottom: str, allowed: List[str]) -> bool:
        mapping = collections.defaultdict(list)
        for u, v, w in allowed:
            mapping[u + v].append(w)

        memo = set()

        def solve(row: str) -> bool:
            if len(row) == 1:
                return True
            if row in memo:
                return False

            def build_next(idx: int, cur: List[str]) -> bool:
                if idx == len(row) - 1:
                    return solve("".join(cur))
                pair = row[idx:idx + 2]
                for top in mapping[pair]:
                    cur.append(top)
                    if build_next(idx + 1, cur):
                        return True
                    cur.pop()
                return False

            res = build_next(0, [])
            if not res:
                memo.add(row)
            return res

        return solve(bottom)

def test():
    sol = Solution()
    assert sol.pyramidTransition("BCD", ["BCC", "CDE", "CEA", "FFF"]) is True, "test 1 failed"
    assert sol.pyramidTransition("AAAA", ["AAB", "AAC", "BCD", "BBE", "DEF"]) is False, "test 2 failed"
    print("✓ pyramid-transition-matrix passed")

if __name__ == "__main__":
    test()

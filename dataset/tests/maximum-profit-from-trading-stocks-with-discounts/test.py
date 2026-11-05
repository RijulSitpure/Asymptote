from typing import List

class Solution:
    def maxProfit(
        self,
        n: int,
        present: List[int],
        future: List[int],
        hierarchy: List[List[int]],
        budget: int,
    ) -> int:
        tree = [[] for _ in range(n)]
        for u, v in hierarchy:
            tree[u - 1].append(v - 1)

        def dfs(u: int):
            no_disc = [0] * (budget + 1)
            with_disc = [0] * (budget + 1)
            for v in tree[u]:
                c_no, c_with = dfs(v)
                new_no = [0] * (budget + 1)
                new_with = [0] * (budget + 1)
                for b1 in range(budget + 1):
                    for b2 in range(budget + 1 - b1):
                        new_no[b1 + b2] = max(new_no[b1 + b2], no_disc[b1] + c_no[b2])
                        new_with[b1 + b2] = max(
                            new_with[b1 + b2], with_disc[b1] + c_with[b2]
                        )
                no_disc = new_no
                with_disc = new_with

            res0 = no_disc[:]
            res1 = no_disc[:]

            fc = present[u]
            fp = future[u] - fc
            for b in range(fc, budget + 1):
                res0[b] = max(res0[b], with_disc[b - fc] + fp)

            hc = present[u] // 2
            hp = future[u] - hc
            for b in range(hc, budget + 1):
                res1[b] = max(res1[b], with_disc[b - hc] + hp)

            return res0, res1

        r0, _ = dfs(0)
        return max(r0)

def run_tests():
    s = Solution()
    res = s.maxProfit(2, [1, 2], [4, 3], [[1, 2]], 3)
    assert res == 5, f"Expected 5, got {res}"
    print("3562 maximum-profit-from-trading-stocks-with-discounts PASSED")

if __name__ == "__main__":
    run_tests()
